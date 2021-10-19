# flask
from flask import Flask, g, Response, request
from flask_cors import CORS
import os

from json import dumps
from neo4j import GraphDatabase

path = os.getcwd()
# Question answering query
# abstract_data = pickle.load(open('./abstract_data.pkl', 'rb'))
# abstract_embed = pickle.load(open('./abstract_embed.pkl', 'rb'))
# def query_qa(text):
#     corr = np.inner(embed([text]).numpy(), abstract_embed)
#     return abstract_data[np.argmax(corr)]

# neo4j
uri = "bolt://localhost:7687"
password = "1234"
database = "kg-minie"

username = "neo4j"
neo4jVersion = "4.3.5"

driver = GraphDatabase.driver(uri, auth=(username, password))

# flask
app = Flask(__name__, instance_path="C:\\Users\\pross\\Desktop\\project\\github\\backend")
CORS(app)


def get_db():
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session(database=database)
    return g.neo4j_db


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'neo4j_db'):
        g.neo4j_db.close()


@app.route("/")
def get_index():
    return "<p>Hello, World!</p>"
    # return app.send_static_file('index.html')


@app.route("/overview")
def overview():
    db = get_db()
    results = db.read_transaction(lambda tx: list(tx.run("MATCH (s)-[r]->(o) "
                                                         "RETURN properties(s) as subject, properties(r) as relation, properties(o) as object "
                                                         "LIMIT $limit",
                                                         {"limit": int(request.args.get("limit", 1000))})))
    nodes = {}
    links = []
    for record in results:
        s = record.get('subject')
        r = record.get('relation')
        o = record.get('object')

        nodes[s['entity_id']] = {
            'id': s['entity_id'],
            'name': s['entity_name']
        }

        nodes[o['entity_id']] = {
            'id': o['entity_id'],
            'name': o['entity_name']
        }

        links.append({
            'source': s['entity_id'],
            'target': o['entity_id'],
            'type': r['relation']
        })

    res = {
        'nodes': list(nodes.values()),
        'links': links
    }
    return Response(dumps(res), mimetype="application/json")


@app.route("/search")
def get_search():
    try:
        name = request.args["name"]
    except KeyError:
        return []
    else:
        db = get_db()
        results = db.read_transaction(lambda tx: list(tx.run("MATCH (s)-[r]->(o) "
                                                             "WHERE s.entity_name =~ $name "
                                                             "RETURN properties(s) as subject, properties(r) as relation, properties(o) as object "
                                                             "LIMIT $limit",
                                                             {"name": "(?i).*" + name + ".*",
                                                              "limit": int(request.args.get("limit", 1000))})))
        nodes = {}
        links = []
        for record in results:
            s = record.get('subject')
            r = record.get('relation')
            o = record.get('object')

            nodes[s['entity_id']] = {
                'id': s['entity_id'],
                'name': s['entity_name']
            }

            nodes[o['entity_id']] = {
                'id': o['entity_id'],
                'name': o['entity_name']
            }

            links.append({
                'source': s['entity_id'],
                'target': o['entity_id'],
                'type': r['relation']
            })

        res = {
            'nodes': list(nodes.values()),
            'links': links
        }
        return Response(dumps(res), mimetype="application/json")


if __name__ == '__main__':
    app.run(debug=True)

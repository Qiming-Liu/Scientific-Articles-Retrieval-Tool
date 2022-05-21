from flask import Flask, g, Response, request
from flask_cors import CORS

from json import dumps
from neo4j import GraphDatabase

import pickle
import numpy as np
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from tensorflow_hub import load

# neo4j
uri = "neo4j://localhost:7687"
neo4jVersion = "4.4.5"
username = "neo4j"
password = "123456"
database = "minio"

driver = GraphDatabase.driver(uri, auth=(username, password))
path = os.getcwd()

# flask
app = Flask(__name__, instance_path=path)
CORS(app)

# question answering
print(' * Loading model')
embed = load(path + "\\embed\\model")
print(' * Loading embed')
abstract_data, abstract_embed = pickle.load(open(path + '\\embed\\abstract_qa.pkl', 'rb'))

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


@app.route("/question")
def question():
    try:
        text = request.args["text"]
    except KeyError:
        return []
    else:
        k = int(request.args.get("k", 1))
        corr = np.inner(embed([text]).numpy(), abstract_embed)[0]
        index = [np.argmax(corr)] if k == 1 else (-corr).argsort()[:k]
        answer = []
        for i in index:
            answer.append({
                'score': format(corr[i], '.2f'),
                'data': abstract_data[i]
            })
        return Response(dumps(answer), mimetype="application/json")


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
def search():
    try:
        name = request.args["keyword"]
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
    app.run(debug=True, use_reloader=False, host='0.0.0.0', port=5000, ssl_context=('secret.pem', 'secret.key'))

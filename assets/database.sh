#############
# Opennre
#############

# windows
docker run --name kg-openie --env NEO4J_dbms_connector_https_advertised__address="localhost:7473" --env NEO4J_dbms_connector_http_advertised__address="localhost:7474" --env NEO4J_dbms_connector_bolt_advertised__address="localhost:7687" -p7474:7474 -p7687:7687 -d -v D:/neo4j/data:/data -v D:/neo4j/logs:/logs -v D:/neo4j/import:/var/lib/neo4j/import -v D:/neo4j/plugins:/plugins -v D:/neo4j/conf:/var/lib/neo4j/conf --env NEO4J_AUTH=neo4j/1234 neo4j
# linux
docker run --name kg-openie -p7474:7474 -p7687:7687 -d -v /home/neo4j/data:/data -v /home/neo4j/logs:/logs -v /home/neo4j/import:/var/lib/neo4j/import -v /home/neo4j/plugins:/plugins -v /home/neo4j/conf:/var/lib/neo4j/conf --env NEO4J_AUTH=neo4j/1234 neo4j

# 1. put import csv, plugin apoc, conf
# 2. restart
# 3. browser run below script
CREATE CONSTRAINT entityIdConstraint ON (ent:Entity) ASSERT ent.entity_id IS UNIQUE
#
LOAD CSV WITH HEADERS FROM "file:///opennre-entity-neo4j.csv" AS csvLine
Merge (:Entity {entity_id: toInteger(csvLine.entity_id), entity_name: csvLine.entity_name})
#
LOAD CSV WITH HEADERS FROM "file:///opennre-post-re.csv" AS csvLine
MATCH (s:Entity {entity_name:csvLine.subject}), (o:Entity {entity_name:csvLine.object})
CALL apoc.create.relationship(s, csvLine.relation, {type:'relation_type'}, o)
YIELD rel
RETURN rel

#############
# MinIE
#############

# windows
docker run --name kg-minie --env NEO4J_dbms_connector_https_advertised__address="localhost:7473" --env NEO4J_dbms_connector_http_advertised__address="localhost:7474" --env NEO4J_dbms_connector_bolt_advertised__address="localhost:7687" -p7474:7474 -p7687:7687 -d -v D:/neo4j-minie/data:/data -v D:/neo4j/logs:/logs -v D:/neo4j-minie/import:/var/lib/neo4j/import -v D:/neo4j-minie/plugins:/plugins -v D:/neo4j-minie/conf:/var/lib/neo4j/conf --env NEO4J_AUTH=neo4j/1234 neo4j
# linux
docker run --name kg-minie -p7474:7474 -p7687:7687 -d -v /home/neo4j/data:/data -v /home/neo4j/logs:/logs -v /home/neo4j/import:/var/lib/neo4j/import -v /home/neo4j/plugins:/plugins -v /home/neo4j/conf:/var/lib/neo4j/conf --env NEO4J_AUTH=neo4j/1234 neo4j

# 1. put import csv, plugin apoc, conf
# 2. restart
# 3. browser run below script
CREATE CONSTRAINT entityIdConstraint ON (ent:Entity) ASSERT ent.entity_id IS UNIQUE
#
LOAD CSV WITH HEADERS FROM "file:///minie-entity-neo4j.csv" AS csvLine
Merge (:Entity {entity_id: toInteger(csvLine.entity_id), entity_name: csvLine.entity_name})
#
LOAD CSV WITH HEADERS FROM "file:///minie-post-re.csv" AS csvLine
MATCH (s:Entity {entity_name:csvLine.subject}), (o:Entity {entity_name:csvLine.object})
CALL apoc.create.relationship(s, csvLine.relation, {type:'relation_type'}, o)
YIELD rel
RETURN rel



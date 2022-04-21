docker exec -it neo4j bin/neo4j-admin import --database=minio --nodes=import/minie-entity.csv --relationships=import/minie-relation.csv
docker exec -it neo4j bin/cypher-shell -u neo4j -p 123456 "CREATE DATABASE minio"
pause
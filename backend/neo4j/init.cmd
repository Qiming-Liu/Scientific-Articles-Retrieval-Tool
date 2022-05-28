docker exec -it neo4j bin/neo4j-admin import --database=minio --nodes=import/entity.csv --relationships=import/relation.csv
docker exec -it neo4j bin/cypher-shell -u neo4j -p 123456 "CREATE DATABASE minio"
docker restart neo4j
pause
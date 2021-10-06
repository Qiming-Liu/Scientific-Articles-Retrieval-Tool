import ForceGraph3D from "3d-force-graph";

const neo4j = require("neo4j-driver");

/**
 * 读取neo4j结果
 * @param limit_items 返回的条目数量
 * @returns {Promise<node_info, rel_info>}
 */

async function getCyperResult(limit_items) {
    const start = new Date()
    const neo4j = require('neo4j-driver')
    const driver = neo4j.driver(this.db.uri, neo4j.auth.basic(this.db.user, this.db.password))
    const session = driver.session()
    const result = await session.run(
        'MATCH (n)-[r]->(m) ' +
        'RETURN ' +
        'id(n) as source, labels(n) as source_labels, properties(n) as source_attrs, ' +
        'id(m) as target, labels(m) as target_labels, properties(m) as target_attrs, ' +
        'id(r) as link,     type(r) as r_type,          properties(r) as r_attrs ' +
        'LIMIT $limit_items ',
        {limit_items: neo4j.int(limit_items)}
    );

    /* 存储节点和边信息
     * node_info[节点ID] = {节点标签：list, 节点属性:dict}
     *   rel_info[边ID] = {  边类别：str,   边属性:dict}
     */
    const node_info = {}
    const rel_info = {}
    result.records.map(r => {
        node_info[r.get('source').toString()] = {
            labels: r.get('source_labels').toString(),
            attrs: r.get('source_attrs').toString()
        };
        node_info[r.get('target').toString()] = {
            labels: r.get('target_labels').toString(),
            attrs: r.get('target_attrs')
        }
        rel_info[r.get('link').toString()] = {
            type: r.get('r_type').toString(),
            attrs: r.get('r_attrs'),
            source: r.get('source').toString(),
            target: r.get('target').toString()
        }
    });
    console.log(Object.keys(node_info).length + " nodes loaded and " + Object.keys(rel_info).length + " links loaded in " + (new Date() - start) + " ms.")
    return {
        node_info,
        rel_info
    }
}

let graph_info = await this.getCyperResult(100000)
/** 构造3D-Graph数据的边 */
const links = Object.values(graph_info.rel_info);
/** 构造3D-Graph数据的节点 */
const nodes = Object.entries(graph_info.node_info).map(entry=>{
    return {id:entry[0], labels:entry[1].labels, attrs:entry[1].attrs}
})
this.graphData = {
    nodes: nodes,
    links: links
}
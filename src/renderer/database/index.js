import Datastore from 'nedb'
import path from 'path'
//服务节点信息
export const Node = new Datastore({
  autoload: true,
  filename: './db/nodeinfo.db'
})

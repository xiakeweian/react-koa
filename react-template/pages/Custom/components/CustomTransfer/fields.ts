import interestData from './interest'

const fields= [
      
        {
            "key": "viewCount",
            "title": "曝光量",
            "groupName": "展点信息",
            "order": 2,
            "isSort": 1
        },
        {
            "key": "validClickCount",
            "title": "点击量",
            "groupName": "展点信息",
            "order": 2,
            "isSort": 1
        },
        {
            "key": "ctr",
            "title": "点击率",
            "groupName": "展点信息",
            "order": 2,
            "isSort": 1
        },
        {
            "key": "cpc",
            "title": "点击均价",
            "groupName": "花费",
            "order": 3,
            "isSort": 1
        },
        {
            "key": "cost",
            "title": "花费",
            "groupName": "花费",
            "order": 3,
            "isSort": 1
        },
        {
            "key": "valuableClickCost",
            "title": "可转化点击成本",
            "groupName": "展点信息",
            "order": 2,
            "isSort": 1
        },
        {
            "key": "clickUserCount",
            "title": "点击人数",
            "groupName": "展点信息",
            "order": 2,
            "isSort": 1
        },
        {
            "key": "avgViewPerUser",
            "title": "人均曝光次数",
            "groupName": "展点信息",
            "order": 2,
            "isSort": 1
        },
       
        {
            "key": "thousandDisplayPrice",
            "title": "千次展现均价",
            "groupName": "花费",
            "order": 3,
            "isSort": 1
        },
        {
            "key": "costDeviationRate",
            "title": "当日成本偏差",
            "groupName": "花费",
            "order": 3,
            "isSort": 1
        },
        {
            "key": "effectiveLeadsCount",
            "title": "有效线索量",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "奶粉",
            "title": "奶粉",
            "groupName": "母婴",
            "order": 1,
            "isSort": 1
        },
        {
            "key": "niaobushi",
            "title": "尿不湿",
            "groupName": "母婴",
            "order": 2,
            "isSort": 1
        },
        {
            "key": "naiping",
            "title": "奶瓶",
            "groupName": "母婴",
            "order": 3,
            "isSort": 1
        },
        {
            "key": "yishengjun",
            "title": "益生菌",
            "groupName": "母婴",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "sportShoes",
            "title": "运动鞋",
            "groupName": "运动",
            "order": 1,
            "isSort": 1
        },
        {
            "key": "badminton",
            "title": "羽毛球",
            "groupName": "运动",
            "order": 2,
            "isSort": 1
        },
        {
            "key": "Basketball",
            "title": "篮球",
            "groupName": "运动",
            "order": 3,
            "isSort": 1
        },
        {
            "key": "sportShoes2",
            "title": "运动鞋2",
            "groupName": "运动",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "badminton2",
            "title": "羽毛球2",
            "groupName": "运动",
            "order": 5,
            "isSort": 1
        },
        {
            "key": "Basketball2",
            "title": "篮球2",
            "groupName": "运动",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "shangyi1",
            "title": "上衣1",
            "groupName": "衣服",
            "order": 2,
            "isSort": 1 
        },
        {
            "key": "shangyi2",
            "title": "上衣2",
            "groupName": "衣服",
            "order": 2,
            "isSort": 1 
        },
        {
            "key": "shangyi3",
            "title": "上衣3",
            "groupName": "衣服",
            "order": 3,
            "isSort": 1 
        },
        {
            "key": "shangyi4",
            "title": "上衣4",
            "groupName": "衣服",
            "order": 4,
            "isSort": 1 
        },
        {
            "key": "shangyi5",
            "title": "上衣5",
            "groupName": "衣服",
            "order": 5,
            "isSort": 1 
        },
        {
            "key": "shangyi6",
            "title": "上衣6",
            "groupName": "衣服",
            "order": 6,
            "isSort": 1 
        },
        {
            "key": "shangyi7",
            "title": "上衣7",
            "groupName": "衣服",
            "order": 7,
            "isSort": 1 
        },
        {
            "title": "日常护理",
            "key": 25,
            "groupName": "洗护用品",
            "order": 1,
            "isSort": 1 
        },
        {
            
            "title": "洗衣液/皂",
            "key":26,
            "groupName": "洗护用品",
            "order": 2,
            "isSort": 1 
        },
        {
            "title": "母婴理发器",
            "key":40,
            "groupName": "洗护用品",
            "order": 3,
            "isSort": 1 
        },
        {
            "title": "洗发沐浴",
            "key":45,
            "groupName": "洗护用品",
            "order": 4,
            "isSort": 1 
        },
        {
            "title": "宝宝护肤",
            "key": 52,
            "groupName": "洗护用品",
            "order": 5,
            "isSort": 1 
        },
        {
            "title": "驱蚊防晒",
            "key": 53,
            "groupName": "洗护用品",
            "order": 6,
            "isSort": 1 
        },
        {
            "title": "奶瓶清洗",
            "key": 57,
            "groupName": "洗护用品",
            "order": 6,
            "isSort": 7 
        },
        {
            "title": "婴儿口腔清洁",
            "key": 58,
            "groupName": "洗护用品",
            "order": 8,
            "isSort": 1 
        },
        {
            "title": "洗澡用具",
            "key": 71,
            "groupName": "洗护用品",
            "order": 9,
            "isSort": 1 
        },
        {
            "title": "座便器",
            "key":84,
            "groupName": "洗护用品",
            "order": 10,
            "isSort": 1 
        }
     
    ]
    const Toiletries = [
        {
            "title": "日常护理",
            "key": 25,
            "groupName": "洗护用品",
            "order": 1,
            "isSort": 1 
        },
        {
            
            "title": "洗衣液/皂",
            "key":26,
            "groupName": "洗护用品",
            "order": 2,
            "isSort": 1 
        },
        {
            "title": "母婴理发器",
            "key":40,
            "groupName": "洗护用品",
            "order": 3,
            "isSort": 1 
        },
        {
            "title": "洗发沐浴",
            "key":45,
            "groupName": "洗护用品",
            "order": 4,
            "isSort": 1 
        },
        {
            "title": "宝宝护肤",
            "key": 52,
            "groupName": "洗护用品",
            "order": 5,
            "isSort": 1 
        },
        {
            "title": "驱蚊防晒",
            "key": 53,
            "groupName": "洗护用品",
            "order": 6,
            "isSort": 1 
        },
        {
            "title": "奶瓶清洗",
            "key": 57,
            "groupName": "洗护用品",
            "order": 6,
            "isSort": 7 
        },
        {
            "title": "婴儿口腔清洁",
            "key": 58,
            "groupName": "洗护用品",
            "order": 8,
            "isSort": 1 
        },
        {
            "title": "洗澡用具",
            "key": 71,
            "groupName": "洗护用品",
            "order": 9,
            "isSort": 1 
        },
        {
            "title": "座便器",
            "key":84,
            "groupName": "洗护用品",
            "order": 10,
            "isSort": 1 
        },
      
    ]
    const newFields =  fields.concat(interestData)
    

export default newFields
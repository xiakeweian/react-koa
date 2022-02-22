const fields= [
        {
            "key": "campaignId",
            "title": "推广计划ID",
            "groupName": "属性指标",
            "order": 1,
            "isSort": 0
        },
        {
            "key": "corporationName",
            "title": "广告主名称",
            "groupName": "属性指标",
            "order": 1,
            "isSort": 0
        },
        {
            "key": "accountId",
            "title": "账号ID",
            "groupName": "属性指标",
            "order": 1,
            "isSort": 0
        },
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
            "key": "valuableClickCount",
            "title": "可转化点击次数",
            "groupName": "展点信息",
            "order": 2,
            "isSort": 1
        },
        {
            "key": "valuableClickRate",
            "title": "可转化点击率",
            "groupName": "展点信息",
            "order": 2,
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
            "key": "viewUserCount",
            "title": "曝光人数",
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
            "key": "effectiveCost",
            "title": "有效线索成本",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "overallLeadsPurchaseCount",
            "title": "综合销售线索人数",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "leadsPurchaseCount",
            "title": "付费销售线索次数",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "leadsPurchaseRate",
            "title": "付费销售线索转化率",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "leadsPurchaseCost",
            "title": "付费销售线索成本",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "leadsPurchaseUv",
            "title": "付费销售线索人数",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "validLeadsRate",
            "title": "有效销售线索转化率",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "validLeadsCost",
            "title": "有效销售线索成本",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "leadsUserRate",
            "title": "销售线索转化率（人数）",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "leadsCost",
            "title": "销售线索成本（人数）",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "leadsUserCount",
            "title": "销售线索人数",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "leadsRate",
            "title": "销售线索转化率（次数）",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "questReservationPvCost",
            "title": "销售线索成本（次数）",
            "groupName": "线索汇总",
            "order": 4,
            "isSort": 1
        },
        {
            "key": "pageReservationCount",
            "title": "表单预约量",
            "groupName": "表单线索",
            "order": 5,
            "isSort": 1
        },
        {
            "key": "pageReservationRate",
            "title": "表单预约率",
            "groupName": "表单线索",
            "order": 5,
            "isSort": 1
        },
        {
            "key": "pageReservationCost",
            "title": "表单预约成本",
            "groupName": "表单线索",
            "order": 5,
            "isSort": 1
        },
        {
            "key": "externalFormReservationCount",
            "title": "附加创意表单预约量",
            "groupName": "表单线索",
            "order": 5,
            "isSort": 1
        },
        {
            "key": "effectiveReserveCount",
            "title": "有效线索量-表单",
            "groupName": "表单线索",
            "order": 5,
            "isSort": 1
        },
        {
            "key": "potentialReserveCount",
            "title": "潜在客户线索量-表单",
            "groupName": "表单线索",
            "order": 5,
            "isSort": 1
        },
        {
            "key": "validLeadsUv",
            "title": "有效线索人数-表单",
            "groupName": "表单线索",
            "order": 5,
            "isSort": 1
        },
        {
            "key": "pagePhoneCallDirectCount",
            "title": "电话直拨量",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "pagePhoneCallDirectCost",
            "title": "电话直拨成本",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "pagePhoneCallBackCount",
            "title": "电话回拨量",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "pagePhoneCallBackCost",
            "title": "电话回拨成本",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "intePhoneCount",
            "title": "智能电话拨打量",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "phoneCallCount",
            "title": "普通电话拨打量",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "effectivePhoneCount",
            "title": "有效线索量-电话",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "potentialPhoneCount",
            "title": "潜在客户线索量-电话",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "pagePhoneCallDirectRate",
            "title": "电话直拨率",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "pagePhoneCallBackRate",
            "title": "电话回拨率",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "phoneConsultCount",
            "title": "附加创意智能电话拨打量",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "phoneCallUv",
            "title": "智能电话拨打人数",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "validPhoneUv",
            "title": "有效线索人数-电话",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "potentialCustomerPhoneUv",
            "title": "潜在客户人数-电话",
            "groupName": "电话线索",
            "order": 6,
            "isSort": 1
        },
        {
            "key": "couponUseCount",
            "title": "卡券使用次数",
            "groupName": "其他线索",
            "order": 7,
            "isSort": 1
        },
        {
            "key": "couponGetRate",
            "title": "卡券领取率",
            "groupName": "其他线索",
            "order": 7,
            "isSort": 1
        },
        {
            "key": "couponGetCost",
            "title": "卡券领取成本（次数）",
            "groupName": "其他线索",
            "order": 7,
            "isSort": 1
        },
        {
            "key": "scanFollowCount",
            "title": "扫码关注量",
            "groupName": "其他线索",
            "order": 7,
            "isSort": 1
        },
        {
            "key": "lotteryLeadsCount",
            "title": "抽奖线索量",
            "groupName": "其他线索",
            "order": 7,
            "isSort": 1
        },
        {
            "key": "lotteryLeadsCost",
            "title": "抽奖线索成本",
            "groupName": "其他线索",
            "order": 7,
            "isSort": 1
        },
        {
            "key": "pageConsultCount",
            "title": "网页咨询量",
            "groupName": "咨询线索",
            "order": 8,
            "isSort": 1
        },
        {
            "key": "pageConsultCost",
            "title": "网页咨询成本",
            "groupName": "咨询线索",
            "order": 8,
            "isSort": 1
        },
        {
            "key": "effectiveConsultCount",
            "title": "有效线索量-咨询",
            "groupName": "咨询线索",
            "order": 8,
            "isSort": 1
        },
        {
            "key": "potentialConsultCount",
            "title": "潜在客户线索量-咨询",
            "groupName": "咨询线索",
            "order": 8,
            "isSort": 1
        },
        {
            "key": "pageConsultRate",
            "title": "网页咨询率",
            "groupName": "咨询线索",
            "order": 8,
            "isSort": 1
        },
        {
            "key": "toolConsultCount",
            "title": "附加创意智能咨询量",
            "groupName": "咨询线索",
            "order": 8,
            "isSort": 1
        },
        {
            "key": "validPageConsultUserCount",
            "title": "有效在线咨询人数",
            "groupName": "咨询线索",
            "order": 8,
            "isSort": 1
        },
        {
            "key": "pageConsultUserCount",
            "title": "在线咨询人数",
            "groupName": "咨询线索",
            "order": 8,
            "isSort": 1
        },
        {
            "key": "conversionsCount",
            "title": "目标转化量",
            "groupName": "转化效果",
            "order": 9,
            "isSort": 1
        },
        {
            "key": "conversionsRate",
            "title": "目标转化率",
            "groupName": "转化效果",
            "order": 9,
            "isSort": 1
        },
        {
            "key": "conversionsCost",
            "title": "目标转化成本",
            "groupName": "转化效果",
            "order": 9,
            "isSort": 1
        },
        {
            "key": "deepConversionsCount",
            "title": "深度转化量",
            "groupName": "转化效果",
            "order": 9,
            "isSort": 1
        },
        {
            "key": "deepConversionsRate",
            "title": "深度目标转化率",
            "groupName": "转化效果",
            "order": 9,
            "isSort": 1
        },
        {
            "key": "deepConversionsCost",
            "title": "深度转化成本",
            "groupName": "转化效果",
            "order": 9,
            "isSort": 1
        },
        {
            "key": "keyPageViewCost",
            "title": "关键页面浏览成本",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformPageViewCount",
            "title": "平台落地页浏览量",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformPageViewRate",
            "title": "平台落地页曝光率",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "keyPageViewCount",
            "title": "关键页面浏览量",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "keyPageUv",
            "title": "关键页面浏览人数",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "videoInnerPlayCount",
            "title": "平台页视频点击次数",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "cpnClickButtonCount",
            "title": "平台页跳转按钮点击次数",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "cpnClickButtonUv",
            "title": "平台页跳转按钮点击人数",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "specialPageExpUv",
            "title": "指定页面曝光人数",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "specialPageExpCost",
            "title": "指定页面曝光成本",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "landingPageClickCount",
            "title": "自有页内点击量",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "ownPageNavigationCount",
            "title": "自有页导航量",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "ownPageNaviCost",
            "title": "自有页导航成本",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformPageNavigationCount",
            "title": "平台页导航量",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformPageNavigationCost",
            "title": "平台页导航成本",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformShopNavigationCount",
            "title": "平台页门店点击量",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformShopNavigationCost",
            "title": "平台页门店页导航成本",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "ownPageCouponGetCount",
            "title": "自有页领取卡券量",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "ownPageCouponGetCost",
            "title": "自有页领取卡券成本",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformCouponGetCount",
            "title": "平台页领取卡券量",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformCouponGetCost",
            "title": "平台页卡券领取成本",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformCouponClickCount",
            "title": "平台页卡券点击量",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "platformCouponGetRate",
            "title": "平台页卡券领取率",
            "groupName": "落地页表现",
            "order": 10,
            "isSort": 1
        },
        {
            "key": "videoInnerPlayUserCount",
            "title": "推广页视频播放人数",
            "groupName": "推广页表现",
            "order": 11,
            "isSort": 1
        },
        {
            "key": "cpnClickButtonCost",
            "title": "推广页按钮点击成本",
            "groupName": "推广页表现",
            "order": 11,
            "isSort": 1
        },
        {
            "key": "platformKeyPageViewDuration",
            "title": "推广页人均曝光时长（秒）",
            "groupName": "推广页表现",
            "order": 11,
            "isSort": 1
        },
        {
            "key": "platformKeyPageAvgViewPerUser",
            "title": "推广页人均曝光次数",
            "groupName": "推广页表现",
            "order": 11,
            "isSort": 1
        },
        {
            "key": "platformKeyPageViewUserCount",
            "title": "推广页曝光人数",
            "groupName": "推广页表现",
            "order": 11,
            "isSort": 1
        },
        {
            "key": "followCount",
            "title": "关注量",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "followCost",
            "title": "关注成本",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "forwardCount",
            "title": "转发量",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "forwardCost",
            "title": "转发成本",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "readCount",
            "title": "阅读量",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "readCost",
            "title": "阅读成本",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "praiseCount",
            "title": "点赞量",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "praiseCost",
            "title": "点赞成本",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "commentCount",
            "title": "评论量",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "commentCost",
            "title": "评论成本",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "commentUserCount",
            "title": "评论人数",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "praiseUserCount",
            "title": "点赞人数",
            "groupName": "社交互动",
            "order": 12,
            "isSort": 1
        },
        {
            "key": "videoPlayCount",
            "title": "朋友圈视频播放次数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "videoOuterPlayCount",
            "title": "外层视频播放次数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "clickImageCount",
            "title": "外层图片点击次数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "clickDetailCount",
            "title": "文字链点击次数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "clickHeadCount",
            "title": "头像点击次数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "clickNickCount",
            "title": "昵称点击次数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "noInterestCount",
            "title": "不感兴趣点击次数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "videoOuterPlayUserCount",
            "title": "朋友圈外层视频播放人数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "nicknameClickUserCount",
            "title": "昵称点击人数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "portraitClickUserCount",
            "title": "头像点击人数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "linkClickUserCount",
            "title": "文字链点击人数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "videoClickUserCount",
            "title": "视频点击人数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "imageClickUserCount",
            "title": "图片点击人数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "forwardUserCount",
            "title": "广告分享人数",
            "groupName": "创意互动",
            "order": 13,
            "isSort": 1
        },
        {
            "key": "officialAccountCreditUserCount",
            "title": "公众号内授信人数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountCreditApplyUserCount",
            "title": "公众号内进件人数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountFirstDayOrderCount",
            "title": "首日公众号内下单次数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountOrderCount",
            "title": "公众号内下单次数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountApplyRoi",
            "title": "公众号内填单ROI",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountApplyAmount",
            "title": "公众号内填单金额",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountApplyCost",
            "title": "公众号内填单成本",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountApplyRate",
            "title": "公众号内填单比例",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountApplyUserCount",
            "title": "公众号内填单人数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountApplyCount",
            "title": "公众号内填单次数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountRegisterRoi",
            "title": "公众号内注册ROI",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountRegisterAmount",
            "title": "公众号内注册订单金额",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountRegisterCost",
            "title": "公众号内注册成本",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountRegisterRate",
            "title": "公众号内注册比例",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountRegisterUserCount",
            "title": "公众号内注册人数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountFollowRate",
            "title": "公众号关注率",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountFollowCost",
            "title": "公众号关注成本（次数）",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountFollowCount",
            "title": "公众号关注次数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountReaderCount",
            "title": "阅读粉丝量",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountConsultCount",
            "title": "公众号内发消息人数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountOrderRoi",
            "title": "公众号内下单ROI",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountFirstDayOrderAmount",
            "title": "首日公众号内下单金额",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountOrderAmount",
            "title": "公众号内下单金额",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountOrderCost",
            "title": "公众号内下单成本",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountOrderRate",
            "title": "公众号内下单比例",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "officialAccountOrderUserCount",
            "title": "公众号内下单人数",
            "groupName": "公众号表现",
            "order": 14,
            "isSort": 1
        },
        {
            "key": "webRegisterCount",
            "title": "注册量（网页）",
            "groupName": "注册",
            "order": 15,
            "isSort": 1
        },
        {
            "key": "webRegisterCost",
            "title": "注册成本（网页）",
            "groupName": "注册",
            "order": 15,
            "isSort": 1
        },
        {
            "key": "webRegRate",
            "title": "注册率（网页）",
            "groupName": "注册",
            "order": 15,
            "isSort": 1
        },
        {
            "key": "webRegisterUv",
            "title": "注册人数（网页）",
            "groupName": "注册",
            "order": 15,
            "isSort": 1
        },
        {
            "key": "appRegisterCount",
            "title": "注册量（APP）",
            "groupName": "注册",
            "order": 15,
            "isSort": 1
        },
        {
            "key": "appRegisterCost",
            "title": "注册成本（APP）",
            "groupName": "注册",
            "order": 15,
            "isSort": 1
        },
        {
            "key": "appRegisterRate",
            "title": "注册率（APP）",
            "groupName": "注册",
            "order": 15,
            "isSort": 1
        },
        {
            "key": "cheoutFdReward",
            "title": "首日广告花费回报(ROI)",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutTdReward",
            "title": "3日广告花费回报(ROI)",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutOwReward",
            "title": "7日广告花费回报(ROI)",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutTwReward",
            "title": "14日广告花费回报(ROI)",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutOmReward",
            "title": "30日广告花费回报(ROI)",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutTotalReward",
            "title": "累计广告花费回报(ROI)",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "webCheckoutAmount",
            "title": "付费金额（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "webCheckoutCount",
            "title": "付费行为量（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "webCheckoutCost",
            "title": "付费行为成本（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "webCheckoutRate",
            "title": "点击付费行为率（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "webActivatedCheckoutRate",
            "title": "激活付费行为率（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutFd",
            "title": "首日付费金额",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutTd",
            "title": "3日付费金额",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutOw",
            "title": "7日付费金额",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutTw",
            "title": "14日付费金额",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "cheoutOm",
            "title": "30日付费金额",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "firstPayCount",
            "title": "首次付费行为人数",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "firstPayRate",
            "title": "首次激活付费率",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "firstPayCost",
            "title": "首次付费成本",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "webCartAmount",
            "title": "加入购物车金额（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "appCheckoutCount",
            "title": "付费行为量（APP）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "appCheckoutAmount",
            "title": "付费金额（APP）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "appCheckoutCost",
            "title": "付费行为成本（APP）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "appCheckoutRate",
            "title": "点击付费行为率（APP）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "appActivatedCheckoutRate",
            "title": "激活付费行为率（APP）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "firstMemcardWebCount",
            "title": "首次购买会员人数（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "firstMemcardAppCount",
            "title": "首次购买会员人数（APP）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "memcardWebCount",
            "title": "购买会员次数（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "memcardAppCount",
            "title": "购买会员次数（APP）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "firstMemcardWebRate",
            "title": "首次购买会员率（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "firstMemcardAppRate",
            "title": "首次购买会员率（APP）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "firstMemcardWebCost",
            "title": "首次购买会员成本（网页）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "firstMemcardAppCost",
            "title": "首次购买会员成本（APP）",
            "groupName": "付费",
            "order": 16,
            "isSort": 1
        },
        {
            "key": "compensationAmount",
            "title": "赔付金额",
            "groupName": "赔付",
            "order": 17,
            "isSort": 1
        },
        {
            "key": "arppuCost",
            "title": "ARPPU",
            "groupName": "流量主变现",
            "order": 20,
            "isSort": 1
        },
        {
            "key": "arpuCost",
            "title": "ARPU",
            "groupName": "流量主变现",
            "order": 20,
            "isSort": 1
        },
        {
            "key": "retentionCount",
            "title": "次日留存人数（APP）",
            "groupName": "留存",
            "order": 21,
            "isSort": 1
        },
        {
            "key": "retentionRate",
            "title": "次日留存率（APP）",
            "groupName": "留存",
            "order": 21,
            "isSort": 1
        },
        {
            "key": "retentionCost",
            "title": "次日留存成本（APP）",
            "groupName": "留存",
            "order": 21,
            "isSort": 1
        },
        {
            "key": "webAddToCartCount",
            "title": "加入购物车量（网页）",
            "groupName": "购物车",
            "order": 22,
            "isSort": 1
        },
        {
            "key": "webAddToCartCost",
            "title": "加入购物车成本（网页）",
            "groupName": "购物车",
            "order": 22,
            "isSort": 1
        },
        {
            "key": "addToCartPrice",
            "title": "加入购物车成本",
            "groupName": "购物车",
            "order": 22,
            "isSort": 1
        },
        {
            "key": "appAddToCartCount",
            "title": "加入购物车量（APP）",
            "groupName": "购物车",
            "order": 22,
            "isSort": 1
        },
        {
            "key": "addToCartAmount",
            "title": "加入购物车金额（APP）",
            "groupName": "购物车",
            "order": 22,
            "isSort": 1
        },
        {
            "key": "appAddToCartCost",
            "title": "加入购物车成本（APP）",
            "groupName": "购物车",
            "order": 22,
            "isSort": 1
        },
        {
            "key": "orderCount",
            "title": "下单量",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "webOrderCount",
            "title": "下单量（网页）",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "webOrderRate",
            "title": "下单率",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "webOrderCost",
            "title": "下单成本（网页）",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "orderAmount",
            "title": "订单金额",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "orderUnitPrice",
            "title": "下单单价",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "orderRoi",
            "title": "下单花费回报(ROI)",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "webOrderAmount",
            "title": "下单金额（网页）",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "firstDayOrderCount",
            "title": "首日新增下单量",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "firstDayOrderAmount",
            "title": "首日新增下单金额",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "addWishlistCount",
            "title": "加收藏次数",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "appOrderRate",
            "title": "下单率（APP）",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "deliverCount",
            "title": "订单发货量",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "deliverCost",
            "title": "订单发货成本",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "signInCount",
            "title": "订单签收量",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "signInCost",
            "title": "订单签收成本",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "appOrderCount",
            "title": "下单量（APP）",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "appOrderCost",
            "title": "下单成本（APP）",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "appOrderAmount",
            "title": "下单金额（APP）",
            "groupName": "下单",
            "order": 23,
            "isSort": 1
        },
        {
            "key": "withdrDepWebUserCount",
            "title": "网页提现人数",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "downloadCount",
            "title": "APP下载完成量",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "activatedCount",
            "title": "APP激活总量",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "activatedRate",
            "title": "APP下载激活率",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "downloadRate",
            "title": "APP下载率",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "downloadCost",
            "title": "APP下载成本",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "installCount",
            "title": "APP安装量",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "installCost",
            "title": "APP安装成本",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "clickActivatedRate",
            "title": "APP点击激活率",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "activatedCost",
            "title": "APP激活成本",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "installRate",
            "title": "APP安装率",
            "groupName": "APP表现",
            "order": 24,
            "isSort": 1
        },
        {
            "key": "poiClickUserCount",
            "title": "门店点击人数",
            "groupName": "门店表现",
            "order": 25,
            "isSort": 1
        },
        {
            "key": "clickPoiCount",
            "title": "本地门店点击量",
            "groupName": "门店表现",
            "order": 25,
            "isSort": 1
        },
        {
            "key": "webApplicationCount",
            "title": "金融完件量（网页）",
            "groupName": "行业专属指标",
            "order": 26,
            "isSort": 1
        },
        {
            "key": "webApplicationCost",
            "title": "金融完件成本（网页）",
            "groupName": "行业专属指标",
            "order": 26,
            "isSort": 1
        }
    ]
export default fields
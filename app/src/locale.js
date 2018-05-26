import LocalizedStrings from 'react-localization'
import Cookies from "js-cookie"

const GR = new LocalizedStrings({
  en: {
    orderNo: 'Order No',
    tenant:'Tanant',
    price:'Price',
    promotion_code:'Promotion Code',
    subtotal:'Subtotal',
    amount:'Amount',
    device_count:'Device Count',
    pay:'Payment',
    search:'Search',
    tip:'Tip',
    info:'Infomation',
    confirmInfo:'Are you sure this operation?',
    none:'None',
    checkout:'Checkout',
    cancelOrder:'Cancel Order',
    paid:'Paid',
    free:'Free',
    remark:'Remark',
    status:'Status',
    nextpage:'Next Page',
    lastpage:'Last Page',
    email:'Email',
    account:'Account',
    operation:'Operation',
    create:'Create',
    return:'Return',
    update:'Update',
    selectServer: 'Select Server', 
    create_instance:'Create Instance',
    initialize_instance:'Initialize Instance',
    trial:'Trial',
    create_date:'Create Date',
    formal:"Formal",
    license:'License',
  },
  zh: {
    orderNo: '订单编号',
    tenant:'租户',
    price:'单价(每天)',
    promotion_code:'优惠券',
    subtotal:'小计',
    amount:'实际付款金额',
    device_count:'设备数量',
    pay:'付款',
    search:"查询",
    tip:'提示',
    info:'确认信息',
    confirmInfo:'确定此操作吗?',
    none:'无',
    checkout:'去付款',
    cancelOrder:'取消订单',
    paid:'已付款',
    free:'免单',
    remark:'备注',
    status:'状态',
    nextpage:'下一页',
    lastpage:'上一页',
    email:'邮箱',
    account:'用户账户',
    operation:'操作',
    create:'创建',
    return:'返回',
    update:"更新",
    selectServer: '选择服务器',
    create_instance:'创建实例',
    initialize_instance:'初始化实例',
    trial:'试用',
    create_date:'创建日期',
    formal:"正式",
    license:'许可',
  }
})

var language = Cookies.get('language') || GR.getLanguage()    
GR.setLanguage(language)

export default GR
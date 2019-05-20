const Index = r => require.ensure([], () => r(require('@/pages')), 'Index')
const NotFound = r => require.ensure([], () => r(require('@/pages/notFound')), 'notFound')
const author = r => require.ensure([], () => r(require('@/pages/author')), 'author')

const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home')
const volume = r => require.ensure([], () => r(require('@/pages/Home/volume')), 'volume')
const volumeCalc = r => require.ensure([], () => r(require('@/pages/Home/volumeCalc')), 'volumeCalc')
const About = r => require.ensure([], () => r(require('@/pages/About')), 'About')
const JoinUs = r => require.ensure([], () => r(require('@/pages/About/joinus')), 'JoinUs')

const Commodity = r => require.ensure([], () => r(require('@/pages/Commodity')), 'Commodity')
const Market = r => require.ensure([], () => r(require('@/pages/Home/market')), 'Market')
const Hotbuy = r => require.ensure([], () => r(require('@/pages/Tobuy')), 'Hotbuy')
const Publish = r => require.ensure([], () => r(require('@/pages/Tobuy/publish')), 'Publish')
const Supply = r => require.ensure([], () => r(require('@/pages/Tobuy/supply')), 'Supply')
const PublishDetail = r => require.ensure([], () => r(require('@/pages/Tobuy/publishDetail')), 'PublishDetail')
//const SupplyDetail = r => require.ensure([], () => r(require('@/pages/Tobuy/supplyDetail')), 'supplyDetail')
const Success = r => require.ensure([], () => r(require('@/pages/User/success')), 'success')

//帮助中心
const Helper = r => require.ensure([], () => r(require('@/pages/Helper')), 'Helper')
const Helper1 = r => require.ensure([], () => r(require('@/pages/Helper/1')), 'Helper1')
const Helper2 = r => require.ensure([], () => r(require('@/pages/Helper/2')), 'Helper2')
const Helper3 = r => require.ensure([], () => r(require('@/pages/Helper/3')), 'Helper3')
const Helper4 = r => require.ensure([], () => r(require('@/pages/Helper/4')), 'Helper4')
const Helper5 = r => require.ensure([], () => r(require('@/pages/Helper/5')), 'Helper5')
const Helper6 = r => require.ensure([], () => r(require('@/pages/Helper/6')), 'Helper6')
const Helper7 = r => require.ensure([], () => r(require('@/pages/Helper/7')), 'Helper7')
const Helper8 = r => require.ensure([], () => r(require('@/pages/Helper/8')), 'Helper8')
const Helper9 = r => require.ensure([], () => r(require('@/pages/Helper/9')), 'Helper9')
const Helper10 = r => require.ensure([], () => r(require('@/pages/Helper/10')), 'Helper10')
const Helper11 = r => require.ensure([], () => r(require('@/pages/Helper/11')), 'Helper11')
const Helper12 = r => require.ensure([], () => r(require('@/pages/Helper/12')), 'Helper12')
const Helper13 = r => require.ensure([], () => r(require('@/pages/Helper/13')), 'Helper13')
const Helper14 = r => require.ensure([], () => r(require('@/pages/Helper/14')), 'Helper14')
const Helper15 = r => require.ensure([], () => r(require('@/pages/Helper/15')), 'Helper15')

//登录
const Login = r => require.ensure([], () => r(require('@/pages/Login/Login')), 'Login')
const Register = r => require.ensure([], () => r(require('@/pages/Login/register')), 'register')

//商城
const Store = r => require.ensure([], () => r(require('@/pages/Store')), 'Store')
const Cart = r => require.ensure([], () => r(require('@/pages/Store/cart')), 'cart')
const Search = r => require.ensure([], () => r(require('@/pages/Store/search')), 'search')
const Detail = r => require.ensure([], () => r(require('@/pages/Store/detail')), 'detail')
const Voucher = r => require.ensure([], () => r(require('@/pages/Store/voucher')), 'voucher')
const Pay = r => require.ensure([], () => r(require('@/pages/Store/pay')), 'pay')
const Order = r => require.ensure([], () => r(require('@/pages/Store/order')), 'order')
const paySuccess = r => require.ensure([], () => r(require('@/pages/Store/paySuccess')), 'paySuccess')

//用户中心
const User = r => require.ensure([], () => r(require('@/pages/User')), 'User')
const CompanyApply = r => require.ensure([], () => r(require('@/pages/User/companyApply')), 'companyApply')
const PersonApply = r => require.ensure([], () => r(require('@/pages/User/personApply')), 'personApply')
const ReceivingAccount = r => require.ensure([], () => r(require('@/pages/User/ReceivingAccount')), 'ReceivingAccount')
const UserInfo = r => require.ensure([], () => r(require('@/pages/User/userInfo')), 'userInfo')
const Address = r => require.ensure([], () => r(require('@/pages/User/buyer/address')), 'address')
const BuyerOrder = r => require.ensure([], () => r(require('@/pages/User/buyer/buyerOrder')), 'buyerOrder')
const Collect = r => require.ensure([], () => r(require('@/pages/User/buyer/collect')), 'collect')
const BuyerOrderDetail = r => require.ensure([], () => r(require('@/pages/User/buyer/buyerOrderDetail')), 'buyerOrderDetail')
const SellerOrderDetail = r => require.ensure([], () => r(require('@/pages/User/seller/SellerOrderDetail')), 'SellerOrderDetail')
const ApplyRefund = r => require.ensure([], () => r(require('@/pages/User/buyer/applyRefund')), 'applyRefund')
const AddAddress = r => require.ensure([], () => r(require('@/pages/User/buyer/addAddress')), 'addAddress')
const SubmitSuccess = r => require.ensure([], () => r(require('@/pages/User/buyer/submitSuccess')), 'submitSuccess')
const GoodsManage = r => require.ensure([], () => r(require('@/pages/User/seller/goodsManage')), 'goodsManage')
const SellerOrder = r => require.ensure([], () => r(require('@/pages/User/seller/sellerOrder')), 'sellerOrder')
const ReviseOrder = r => require.ensure([], () => r(require('@/pages/User/seller/reviseOrder')), 'reviseOrder')
const SellerShop = r => require.ensure([], () => r(require('@/pages/User/seller/sellerShop')), 'sellerShop')
const StoreSet = r => require.ensure([], () => r(require('@/pages/User/seller/storeSet')), 'storeSet')
const DeliverGoods = r => require.ensure([], () => r(require('@/pages/User/seller/deliverGoods')), 'deliverGoods')
const WatchRefund = r => require.ensure([], () => r(require('@/pages/User/seller/watchRefund')), 'watchRefund')
const issueSuccess = r => require.ensure([], () => r(require('@/pages/User/seller/issueSuccess')), 'issueSuccess')
const FundManage = r => require.ensure([], () => r(require('@/pages/User/seller/fundManage')), 'fundManage')
const Enchashment = r => require.ensure([], () => r(require('@/pages/User/seller/enchashment')), 'enchashment')
const EnchashRecord = r => require.ensure([], () => r(require('@/pages/User/seller/enchashRecord')), 'enchashRecord')
const AccountManage = r => require.ensure([], () => r(require('@/pages/User/seller/accountManage')), 'accountManage')
const AccountEdit = r => require.ensure([], () => r(require('@/pages/User/seller/accountEdit')), 'accountEdit')

const OpenAccount = r => require.ensure([], () => r(require('@/pages/User/account/openAccount')), 'openAccount')
const PersonalAccount = r => require.ensure([], () => r(require('@/pages/User/account/personalAccount')), 'personalAccount')
const CorporateAccount = r => require.ensure([], () => r(require('@/pages/User/account/corporateAccount')), 'corporateAccount')
const ShareholdersInfo = r => require.ensure([], () => r(require('@/pages/User/account/shareholdersInfo')), 'shareholdersInfo')
const AccountInfo = r => require.ensure([], () => r(require('@/pages/User/account/accountInfo')), 'accountInfo')
const CorporationInfo = r => require.ensure([], () => r(require('@/pages/User/account/corporationInfo')), 'corporationInfo')
const EditShareholder = r => require.ensure([], () => r(require('@/pages/User/account/editShareholder')), 'editShareholder')
const AddShareholder = r => require.ensure([], () => r(require('@/pages/User/account/addShareholder')), 'addShareholder')


//芬木金融
const Finance = r => require.ensure([], () => r(require('@/pages/home/finance')), 'finance')
const ApplyLoan = r => require.ensure([], () => r(require('@/pages/home/applyLoan')), 'applyLoan')

//申请商户小程序
const WxApp = r => require.ensure([], () => r(require('@/pages/Activity/wxApp')), 'wxApp')
const ApplySuccess = r => require.ensure([], () => r(require('@/pages/Activity/applySuccess')), 'applySuccess')



let routes = [
  {
    path: '*',
    name: '404页面',
    component: NotFound
  },
  {
    path: '/author',
    name: '微信授权',
    component: author
  },
  {
    path: '/',
    component: Index,
    children: [
      {
        path:'/',
        name:'首页',
        component:Home,
      },
      {
        path: '/store',
        name: '现货商城',
        component: Store
      },
      {
        path: '/user',
        name: '我的',
        component: User
      }]
  },
  {
    path: '/market',
    name: '数据',
    component: Market
  },
  {
    path: '/volume',
    name: '材积',
    component: volume
  },
  {
    path: '/volumeCalc',
    name: '材积计算',
    component: volumeCalc
  },
  {
    path: '/finance',
    name: '芬木金融',
    component: Finance
  },
  {
    path: '/applyLoan',
    name: '申请贷款',
    component: ApplyLoan,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/wxApp',
    name: '商家版小程序申请',
    component: WxApp
  },
  {
    path: '/applySuccess',
    name: '申请成功',
    component: ApplySuccess
  },
  {
    path: '/companyapply',
    name: '企业认证',
    component: CompanyApply,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/personapply',
    name: '个人认证',
    component: PersonApply,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/receivingaccount',
    name: '收款账户',
    component: ReceivingAccount
  },
  {
    path: '/userinfo',
    name: '个人信息',
    component: UserInfo,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/address',
    name: '收货地址',
    component: Address,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/buyerOrder',
    name: '买家订单',
    component: BuyerOrder,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/collect',
    name: '我的收藏',
    component: Collect,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/buyerorderdetail',
    name: '买家订单详情',
    component: BuyerOrderDetail
  },
  {
    path: '/sellerorderdetail',
    name: '卖家订单详情',
    component: SellerOrderDetail
  },
  {
    path: '/applyrefund',
    name: '申请退款',
    component: ApplyRefund
  },
  {
    path: '/submitsuccess',
    name: '申请退款成功',
    component: SubmitSuccess
  },
  {
    path: '/addAddress',
    name: '新增地址',
    component: AddAddress
  },
  {
    path: '/goodsManage',
    name: '店铺管理',
    component: GoodsManage,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/sellerOrder',
    name: '卖家订单',
    component: SellerOrder,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/sellerShop',
    name: '卖家店铺',
    component: SellerShop,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/reviseOrder',
    name: '修改订单',
    component: ReviseOrder
  },
  {
    path: '/storeSet',
    name: '店铺设置',
    component: StoreSet,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/accountManage',
    name: '多账号管理',
    component: AccountManage,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/accountEdit',
    name: '添加账号',
    component: AccountEdit
  },
  {
    path: '/cart',
    name: '购物车',
    component: Cart,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/paysuccess',
    name: '支付成功',
    component: paySuccess,
  },
  {
    path: '/about',
    name: '关于我们',
    component: About
  },
  {
    path: '/joinus',
    name: '加入我们',
    component: JoinUs
  },
  {
    path: '/commodity',
    name: '发布商品',
    component: Commodity,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/helper',
    name: '帮助中心',
    component: Helper
  },
  {
    path: '/helper1',
    name: '注册帐号',
    component: Helper1
  },
  {
    path: '/helper2',
    name: '如何个人认证',
    component: Helper2
  },
  {
    path: '/helper3',
    name: '如何企业认证',
    component: Helper3
  },
  {
    path: '/helper4',
    name: '查找货源',
    component: Helper4
  },
  {
    path: '/helper5',
    name: '提交订单',
    component: Helper5
  },
  {
    path: '/helper6',
    name: '支付方式',
    component: Helper6
  },
  {
    path: '/helper7',
    name: '提货方式',
    component: Helper7
  },
  {
    path: '/helper8',
    name: '确认收货',
    component: Helper8
  },
  {
    path: '/helper9',
    name: '如何发布求购',
    component: Helper9
  },
  {
    path: '/helper10',
    name: '商城入驻',
    component: Helper10
  },
  {
    path: '/helper11',
    name: '商品管理',
    component: Helper11
  },
  {
    path: '/helper12',
    name: '订单管理',
    component: Helper12
  },
  {
    path: '/helper13',
    name: '如何提现管理',
    component: Helper13
  },
  {
    path: '/helper14',
    name: '确认发货',
    component: Helper14
  },
  {
    path: '/helper15',
    name: '融资服务',
    component: Helper15
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/register',
    name: '注册',
    component: Register
  },
  {
    path: '/search',
    name: '搜索',
    component: Search
  },
  {
    path: '/detail',
    name: '商品详情',
    component: Detail
  },
  {
    path: '/voucher',
    name: '提交转账凭证',
    component: Voucher
  },
  {
    path: '/pay',
    name: '支付',
    component: Pay
  },
  {
    path: '/order',
    name: '确认订单',
    component: Order,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/hotbuy',
    name: '热门求购',
    component: Hotbuy
  },
  {
    path: '/publish',
    name: '发布求购',
    component: Publish,
    meta:{
      checkLogin:true
    }
  },
  {
    path: '/supply',
    name: '我要供货',
    component: Supply
  },
  {
    path: '/publishDetail',
    name: '求购详情',
    component: PublishDetail
  },
  // {
  //   path: '/supplyDetail',
  //   name: '供货详情',
  //   component: SupplyDetail
  // },
  {
    path: '/success',
    name: '成功',
    component: Success
  },
  {
    path: '/deliverGoods',
    name: '发货',
    component: DeliverGoods
  },
  {
    path: '/watchRefund',
    name: '查看退款',
    component: WatchRefund
  },
  {
    path: '/issuesuccess',
    name: '发布成功',
    component: issueSuccess
  },
  {
    path: '/fundManage',
    name: '提现管理',
    component: FundManage
  },
  {
    path: '/enchashment',
    name: '申请提现',
    component: Enchashment
  },
  {
    path: '/enchashRecord',
    name: '提现记录',
    component: EnchashRecord
  },
  {
    path: '/openAccount',
    name: '申请开户',
    component: OpenAccount
  },
  {
    path: '/personalAccount',
    name: '个人开户',
    component: PersonalAccount
  },
  {
    path: '/corporateAccount',
    name: '企业开户',
    component: CorporateAccount
  },
  {
    path: '/corporationInfo',
    name: '法人信息',
    component: CorporationInfo
  },
  {
    path: '/shareholdersInfo',
    name: '股东信息',
    component: ShareholdersInfo
  },
  {
    path: '/accountInfo',
    name: '开户信息',
    component: AccountInfo
  },
  {
    path: '/editShareholder',
    name: '编辑股东信息',
    component: EditShareholder
  },
  {
    path: '/addShareholder',
    name: '添加股东信息',
    component: AddShareholder
  }
];

export default routes;

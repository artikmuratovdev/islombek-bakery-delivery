export enum PATH {
  BASE_URL = "driver-order/",
  ACTIVE_ORDERS = BASE_URL +"faol-zakaz",
  ACCEPT_ORDER = ACTIVE_ORDERS + "/qabul-qilish/",
  GET_ONE_ORDER = BASE_URL + "order/",
  GET_BREAD_PRICES = BASE_URL + "client/bread-prices",
  SUBMIT_AN_ORDER = ACTIVE_ORDERS + "/topshirish/",
  PRE_ORDER = BASE_URL + "oldindan-zakaz",
  SETUP_ORDER = BASE_URL + "oldindan-zakaz/",
  CREATE_PRE_ORDER = BASE_URL + "create-order/oldindan-zakaz",
  SUBMIT_PRE_ORDER = BASE_URL + "zakasni-topshirish/",
  DELETE_ORDER = BASE_URL + 'orders/'
}
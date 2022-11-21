import { useSelector } from "react-redux"
import { listOrders } from '../actions/orderAction'

export const OrdersUser = () => {

  const orderUserList = useSelector((state) => state.orderList)
  const { orders, loading, success } = orderUserList

  return (
    <>
      <h2>Mis órdenes</h2>
    </>

  )

}
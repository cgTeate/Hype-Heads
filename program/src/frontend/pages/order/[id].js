import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../../layouts/Layout';
import { deliverFail, deliverRequest, deliverReset, deliverSuccess, fetchFail, fetchRequest, fetchSuccess, payFail, payRequest, payReset, paySuccess } from "../../redux/orderSlice";
const url = process.env.NEXT_PUBLIC_SPRINGBOOT_API_URL

function OrderScreen() {
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
   // order/:id
  const { query } = useRouter();
  const orderId = query.id;

  const dispatch = useDispatch();
//   const orders = useSelector((state) => state.order);
  const 
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    } = useSelector((state) => state.order);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch(fetchRequest())
        const { data } = await axios.get(`${url}/api/orders/${orderId}`);
        // console.log(data)
        dispatch(fetchSuccess(data))
      } catch (err) {
        dispatch(fetchFail(err))
      }
    };
    
    if (
      !order.id ||
      successPay ||
    //   successDeliver ||
      (order.id && order.id !== orderId)
    ) {
      fetchOrder();
      
      if (successPay) {
        dispatch(payReset())
        // dispatch(fetchReset())
      }
      
    //   if (successDeliver) {
    //    dispatch(deliverReset())
    //   }
    } else {

      const loadPaypalScript = async () => {
        //to get the paypal client ID from the server
        const access_Token =  sessionStorage.getItem('access_Token')
                if(!access_Token) {
                    console.log("User Not Signed In")
                    return;
                }

                const { data } = await axios.get(`${url}/api/keys/paypal`, {
                    headers: {
                        Authorization: access_Token,
                    }
                });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': data,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
    console.log("order", order)
      console.log("successPay", successPay)
      console.log("isPaid", paid)
      console.log("isPending", isPending)
  }, [
    order, 
    orderId,
    paypalDispatch,  
    successPay,
    //successDeliver,
  ]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    //isPaid,
    paid,
    paidAt,
    isDelivered,
    // deliveredAt,
    delivered,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch(payRequest())
        const { data } = await axios.put(
          `${url}/api/orders/${order.id}/pay`,
          details
        );
        dispatch(paySuccess(data));
        toast.success('Order is paid successfully');
      } catch (err) {
        dispatch(payFail(err));
        toast.error(err);
      }
    });
  }

  function onError(err) {
    toast.error(err);
  }

//   async function deliverOrderHandler() {
//     try {
//       dispatch(deliverRequest())
//       const { data } = await axios.put(
//         `${url}/api/admin/orders/${order._id}/deliver`,
//         {}
//       );
//       dispatch(deliverSuccess(data))
//       toast.success('Order is delivered');
//     } catch (err) {
//       dispatch(deliverFail(err));
//       toast.error(err);
//     }
//   }


  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullname}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postcode},{' '}
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              {paid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    //Might break because of item.id
                    <tr key={item.productName} className="border-b">
                      <td>
                      <Link href={`/product/${item.slug}`}>
                      <a className="flex items-center">
                            <img
                              src={item.thumbnail}
                              alt={item.productName}
                              width={50}
                              height={50}
                            ></img>
                            &nbsp;
                            {item.productName}
                          </a>
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.retailPrice}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.retailPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>{' '}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                {!paid && (
                  <li>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div>Loading...</div>}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

//   return (
//     <Layout title={`Order ${orderId}`}>
//       <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div className="alert-error">{error}</div>
//       ) : (
//         <div className="grid md:grid-cols-4 md:gap-5">
//           <div className="overflow-x-auto md:col-span-3">
//             <div className="card  p-5">
//               <h2 className="mb-2 text-lg">Shipping Address</h2>
//               <div>
//                 {shippingAddress.fullname}, {shippingAddress.address},{' '}
//                 {shippingAddress.city}, {shippingAddress.postcode},{' '}
//                 {shippingAddress.country}
//               </div>
//               {isDelivered ? (
//                 <div className="alert-success">Delivered at {deliveredAt}</div>
//               ) : (
//                 <div className="alert-error">Not delivered</div>
//               )}
//             </div>

//             <div className="card p-5">
//               <h2 className="mb-2 text-lg">Payment Method</h2>
//               <div>{paymentMethod}</div>
//               {paid ? (
//                 <div className="alert-success">Paid at {paidAt}</div>
//               ) : (
//                 <div className="alert-error">Not paid</div>
//               )}
//             </div>

//             <div className="card overflow-x-auto p-5">
//               <h2 className="mb-2 text-lg">Order Items</h2>
//               <table className="min-w-full">
//                 <thead className="border-b">
//                   <tr>
//                     <th className="px-5 text-left">Item</th>
//                     <th className="    p-5 text-right">Quantity</th>
//                     <th className="  p-5 text-right">Price</th>
//                     <th className="p-5 text-right">Subtotal</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orderItems.map((item) => (
//                     <tr key={item.id} className="border-b">
//                       <td>
//                         <Link href={`/product/${item.slug}`}>
//                           <a className="flex items-center">
//                             <Image
//                               src={item.thumbnail}
//                               alt={item.productName}
//                               width={50}
//                               height={50}
//                             ></Image>
//                             &nbsp;
//                             {item.productName}
//                           </a>
//                         </Link>
//                       </td>
//                       <td className=" p-5 text-right">{item.quantity}</td>
//                       <td className="p-5 text-right">${item.retailPrice}</td>
//                       <td className="p-5 text-right">
//                         ${item.quantity * item.retailPrice}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div>
//             <div className="card  p-5">
//               <h2 className="mb-2 text-lg">Order Summary</h2>
//               <ul>
//                 <li>
//                   <div className="mb-2 flex justify-between">
//                     <div>Items</div>
//                     <div>${itemsPrice}</div>
//                   </div>
//                 </li>{' '}
//                 <li>
//                   <div className="mb-2 flex justify-between">
//                     <div>Tax</div>
//                     <div>${taxPrice}</div>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="mb-2 flex justify-between">
//                     <div>Shipping</div>
//                     <div>${shippingPrice}</div>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="mb-2 flex justify-between">
//                     <div>Total</div>
//                     <div>${totalPrice}</div>
//                   </div>
//                 </li>
//                 {!isPaid && (
//                   <li>
//                     {isPending ? (
//                       <div>Loading...</div>
//                     ) : (
//                       <div className="w-full">
//                         <PayPalButtons
//                           createOrder={createOrder}
//                           onApprove={onApprove}
//                           onError={onError}
//                         ></PayPalButtons>
//                       </div>
//                     )}
//                     {loadingPay && <div>Loading...</div>}
//                   </li>
//                 )}
//                 {session.user.isAdmin && order.isPaid && !order.isDelivered && (
//                   <li>
//                     {loadingDeliver && <div>Loading...</div>}
//                     <button
//                       className="primary-button w-full"
//                       onClick={deliverOrderHandler}
//                     >
//                       Deliver Order
//                     </button>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }

OrderScreen.auth = true;
export default OrderScreen;
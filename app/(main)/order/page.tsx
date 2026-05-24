import { getOrder } from "@/app/actions/order"

export default async function OrderPage() {
    const order = await getOrder();

    if(!order) {return <div>no order</div>}

    console.log('order: ', order)
    return(
        <div>order page</div>
    )
}
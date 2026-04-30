import { BookPageProps } from "@/types/propsType/type";


export default function BookPageComponent({book}: BookPageProps){
    return(
        <div>{book.title}</div>
    )
}
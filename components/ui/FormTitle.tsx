

interface FormTitleType{
    title: string,
    subTitle: string
}



export default function FormTitle({title, subTitle}:FormTitleType){

    return(
        <>
        <h3>{title}</h3>
        <span>{subTitle}</span>
        </>
    )
}
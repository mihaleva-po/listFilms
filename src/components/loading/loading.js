import ReactLoading from "react-loading";


const Loading = () => {
    return (
        <div style={{display: 'flex', flex: 1, height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            <ReactLoading type={'spokes'} color={'black'} height={'auto'} width={200}/>

        </div>
    )
}

export default Loading;

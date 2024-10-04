const Page = ({allusers, chatroom}) => {
    return ( 
        <div className="flex h-screen">
            <div className="flex-[1] bg-red-400 h-full flex justify-center items-center">{allusers}</div>
            <div className="flex-[5] bg-red-100 h-full flex justify-center items-center">{chatroom}</div>
        </div>
     );
}
 
export default Page;
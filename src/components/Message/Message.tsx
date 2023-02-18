
type MessageProp = {
    image: string;
    text: string;
}

const Message = ({ image, text }: MessageProp) => {
  return (
    <div className='border border-black flex flex-col items-center text-center'>
        <img src={image} alt="img" className='object-contain w-[80px] h-[80px] mb-[46px]'/>

        <p className='font-Inter text-[#9F9F9F] text-[1rem] w-[50%]'>
            {text}
        </p>
    </div>
  )
}

export default Message
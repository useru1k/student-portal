// import Output from '../components/Output'
import Answer from '../components/Answer'
import Question from '../components/Question'
// import Language from '../components/Language'
import Navbar from '../components/Navbar'
const Editor = () => {
  return (
    <>
       <Navbar/>
      <div className="flex w-full h-screen p-0">
        <div className="w-[40%] h-[125%] pt-56 p-1">
          <Question />
        </div>
        
        <div className="w-[70%] flex flex-col p-5">
          <div>
            {/* <Language/> */}
          </div>
          <div className=" h-[10%]  pt-56">
            <Answer />
          </div>
       
          {/* <div className="h-[30%] p-2">
            <Output />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Editor

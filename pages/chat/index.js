import Template from '@/components/Template'
import Link from 'next/link'

export default function Home() {
  
  return (
    <Template title={"Chat Creator"} activeTab={"chat"}>
      <main className="mx-auto sm:max-w-4xl lg:max-w-5xl 2xl:max-w-6xl">      
        <div className="space-y-4">
          <div>
            <h3 className="text-center text-xl font-semibold text-gray-900">            
              Chatbots Created            
            </h3>
            <p className="mt-1 text-center text-sm text-gray-500 mx-auto max-w-lg">
              These are the list of publicly available chatbot. Click on any one of them to interact with it.
            </p>
          </div>
          <div className="flex flex-wrap md:flex-nowrap md:gap-8">        

            <div className="mt-4 w-full md:mt-0">
              <div>
                <ul role="list" className="flex flex-col flex-wrap">                
                  <li className="flex flex-col rounded-lg border text-center border-indigo-400 bg-indigo-50 py-6 w-full">
                    <Link href='/chat/6418c20aaa9d5fa35f5134a4' className='font-semibold text-indigo-700 text-lg'>Robotic Medicine Chatbot</Link>
                    <p className="relative mt-1 text-sm text-gray-500 px-4">
                      Experience the future of healthcare robotics with our advanced Robotic Medicine chatbot. Stay informed about the latest research and advancements, and explore the diverse applications of robotics in medicine, from surgical procedures to AI diagnostics. Engage in interactive conversations and expand your knowledge in this exciting field.
                    </p>
                  </li>                
                </ul>
              </div>

            </div>          
          </div>
        </div>      
      </main>
    </Template>
  )
}

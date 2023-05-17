import Template from '@/components/Template'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'

export default function CreateChat() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const onUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const onCreateBot = (event) => {
    event.preventDefault();
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      router.push(`/chat/6418c20aaa9d5fa35f5134a4?referred=true`)
    }, 2000);
  }

  return (
    <Template title={"Create Chatbot"} activeTab={"create"}>
      <main className="mx-auto sm:max-w-4xl lg:max-w-5xl 2xl:max-w-6xl">
        <div className="relative">
          <form 
            className="relative space-y-6 p-2"
            onSubmit={onCreateBot}
          >
            <fieldset>
              <div>
                <h3 className="text-center text-2xl font-bold text-gray-900">Create a Chatbot</h3>
                <p className="mt-2 text-center text-sm text-gray-500 max-w-xl mx-auto">
                  Insert the <span className="font-semibold">URL of the web page</span> you want to train this chatbot on. 
                  The response of the chatbot will be based on the content of the webpage.
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="flex rounded-md shadow-sm mt-5 w-3/4 mx-auto">
                  <input
                    id="url"
                    type="url"
                    name="url"
                    placeholder='https://google.com'
                    value={url}
                    className="block w-full min-w-0 flex-1 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-black px-3 py-2"
                    onChange={onUrlChange}
                    required={true}
                  />
                </div>
              </div>
              <div className="space-y-4 pt-5">        
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-indigo-800 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 px-4 py-2 text-sm"
                  >
                    { loading ?  
                      <div className='py-[2px] px-10'>
                        <Loading style='big' color="#fff"/> 
                      </div>
                    : "Create Chatbot" }
                  </button>
                </div>
              </div>
            </fieldset>
          </form>  
        </div>
      </main>
    </Template>
  )
}

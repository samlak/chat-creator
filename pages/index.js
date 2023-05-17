import Template from '@/components/Template'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'

export default function CreateChat() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [ filename, setFilename ] = useState("")

  const router = useRouter();

  const onUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const onFileUpload = (event) => {
    setFilename(event.target.files[0].name);
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
                <h3 className="text-center text-2xl font-bold text-gray-900">Create your own Chatbot</h3>
                <p className="mt-2 text-center text-sm text-gray-500 max-w-xl mx-auto">
                  Insert the <span className="font-semibold">URL of the web page</span> or <span className="font-semibold">upload the document </span> 
                  you want to train this chatbot on. The response of the chatbot will be based on the content provided.
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
                  />
                </div>
              </div>


              <p className='text-gray-900 font-medium text-center my-4 '>OR</p>

              <div class="flex justify-center rounded-md border-2 border-dashed border-gray-300 w-3/4 mx-auto">
                <div class="flex flex-grow items-center justify-center text-center">
                  <div class="w-full py-8">
                    <input id="fileInput" type="file" multiple="" name="file" class="absolute h-1 w-1 overflow-hidden opacity-0" accept=".doc, .docx, .txt, .pdf" onChange={onFileUpload} />
                    <label for="fileInput" class="cursor-pointer text-sm">
                      <div class="flex justify-center pb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" class="h-12 text-gray-500">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          ></path>
                        </svg>
                      </div>
                      <div class="text-gray-800">Click here to choose files.</div>
                      <p class="mt-2 text-xs text-gray-500">PDF, DOC/DOCX, TXT up to 10 MB In Total</p>
                    </label>

                    {filename &&
                      <div class="mt-6 flex justify-center">
                        <div class="flex gap-4">
                          <div class="flex rounded-md border border-indigo-600 bg-indigo-50 p-2 text-xs text-indigo-700">
                            <div><p title="Generative AI Ideas.pdf">{filename}</p></div>
                          </div>
                        </div>
                      </div>
                    }
                    

                  </div>
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

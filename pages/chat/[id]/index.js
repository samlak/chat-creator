import Template from '@/components/Template'
import Loading from '@/components/Loading'
import { useState } from 'react'
import endent from "endent";
import { useRouter } from 'next/router'

export default function Chatbot() {
  const [ message, setMessage ] = useState("");
  const [ history, setHistory ] = useState([]);
  const [ generating, setGenerating ] = useState(false);
  const router = useRouter();
  const { referred } = router.query;

  const onInputChange = (event) => {
    setMessage(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAsk(event);
    }
  };

  const onAsk = async (event) => {
    event.preventDefault();
    if(generating) return ;

    setHistory((history) => ([
      ...history,
      [message, '']
    ]));
    const query = message;
    setMessage("");
    setGenerating(true)
    
    const searchResponse = await fetch("/api/embedding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, matches: 7 })
    });

    if (!searchResponse.ok) {
      setGenerating(false);
      throw new Error(searchResponse.statusText);
    }

    const results = await searchResponse.json();

    const prompt = endent`
    Use the following passages to provide an answer to the query: "${query}"

    ${results?.map((d) => d.content).join("\n\n")}
    `;

    const answerResponse = await fetch("/api/final-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!answerResponse.ok) {
      setGenerating(false);
      throw new Error(answerResponse.statusText);
    }

    const data = answerResponse.body;

    if (!data) {
      return;
    }

    setGenerating(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let generatedOutput = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      generatedOutput += chunkValue;


      setHistory([
        ...history,
        [message, generatedOutput]
      ]);
    }
  }

  return (
    <Template title={"Robotic Medicine Chatbot"} activeTab={"chat"}>
      <main className="mx-auto sm:max-w-4xl lg:max-w-5xl 2xl:max-w-6xl">

        {referred &&
          <p className="text-center rounded-lg border border-red-400 bg-red-100 px-4 py-5 sm:px-6 mb-8 -mt-5 font-medium text-gray-900 max-w-[800px] mx-auto">
            {"Unable to embed the document/webpage you provided. You can chat with other available chatbot."}
          </p>
        }   

        <div className="">
          <div className="space-y-4">
            <div className=''>
              <h3 className="text-center text-2xl font-semibold text-gray-900">Robotic Medicine Chatbot</h3>
              <p className="mt-1 text-center text-sm text-gray-500 max-w-3xl mx-auto">
                Experience the future of healthcare robotics with our advanced Robotic Medicine chatbot. Stay informed about the latest research and advancements, and explore the diverse applications of robotics in medicine, from surgical procedures to AI diagnostics. Engage in interactive conversations and expand your knowledge in this exciting field.
              </p>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap lg:gap-8 pt-7">
              <div className="flex min-h-fit flex-col justify-between w-full">
                <ul>
                  <div className="space-y-4">
                    <li>
                      <div className="center flex items-center justify-start space-x-4 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-5 sm:px-6">
                        <img src="/images/profile.png" className="h-10 rounded-full" alt="Robot Icon" />
                        <p className="text-left font-medium text-gray-900">
                          Hi there! This is your Robotic Medicine Chatbot. What do you want to know about Robotic Medicine?
                        </p>
                      </div>
                    </li>

                    {history.map((groupHistory) => (
                      groupHistory.map((individualHistory, key) => (
                        !key ? 
                          <li key={key}>
                            <div className="flex items-center justify-end space-x-4 rounded-lg border border-gray-100 bg-gray-50 px-4 py-5 sm:px-6">
                              <p className="text-right font-medium text-gray-900">{individualHistory}</p>
                              <div className="inline-flex items-center justify-center rounded-lg"><img src="/images/profile.png" className="h-10 rounded bg-white" /></div>
                            </div>
                          </li>
                        : 
                          <li  key={key}>
                            <div className="center flex items-center justify-start space-x-4 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-5 sm:px-6">
                              <img src="/images/profile.png" className="h-10 rounded-full" alt="Robot Icon" />
                              <p className="text-left font-medium text-gray-900">
                                { individualHistory ? 
                                  individualHistory :
                                  <div className='flex items-center'>
                                    <p className='mr-2'>Generating response</p>
                                    <Loading style="big" />
                                  </div>
                                }
                              </p>
                            </div>
                          </li>
                      ))
                    ))}

                  </div>
                  <div className="border-gray-200 bg-white py-5 mt-4">
                    <div className="min-w-0 flex-1">
                      <form className="relative" onSubmit={onAsk}>
                        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                          <label htmlFor="question" className="sr-only">Ask your question here</label>
                          <textarea
                            id="question"
                            rows="2"
                            name="question"
                            required={"required"}
                            className="block w-full resize-none border-0 py-3 px-3 transition focus:outline-none focus:ring-0 placeholder-gray-500 focus:placeholder-gray-400 font-medium text-gray-900"
                            placeholder="Ask any question about Robotic Medicine?"
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            value={message}
                          ></textarea>
                          <div aria-hidden="true">
                            <div className="py-px"><div className="h-4"></div></div>
                          </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
                          <div className="flex-shrink-0">
                            <button
                              type="submit"
                              className="inline-flex items-center rounded-md border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-indigo-800 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 px-4 py-2 text-sm "
                            >
                              Send                              
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>        
      </main>
    </Template>
  )
}

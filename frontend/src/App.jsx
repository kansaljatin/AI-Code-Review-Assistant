import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-javascript"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)
  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post(`${window.location.origin}/ai/getCodeReview`, { code })
      setReview(response.data)
    } catch (error) {
      setReview(`🚧 Review service is taking a quick break.  Hang tight — we’ll be back up shortly. Thanks for sticking with us!`);
      console.error(error)
    }
  }

  return (
    <>
    <header>
      <h1>AI Code Review Assistant</h1>
      <p> Paste your code below for instant analysis</p>
    </header>
    <main>
      <div className="left">
        <h3 className="panel-heading">Code Editor</h3> {/* Added Heading for Left Panel */}
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              backgroundColor: "#1e1e1e",
              color: "#f8f8f2",
              flex: 1,
              overflow: "auto"
            }}
          />
        </div>
        <button onClick={reviewCode} className="review">Review</button>
      </div>

      <div className="right">
        <h3 className="panel-heading">Review Output</h3> {/* Added Heading for Right Panel */}
        <div className='right-code'>
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
        </div>
      </div>
    </main>
    </>
    
  )
}

export default App

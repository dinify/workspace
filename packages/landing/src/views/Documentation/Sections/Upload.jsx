import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";
// core components
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

const codeExampleImage = `import React from 'react';
// core components
import ImageUpload from 'components/CustomUpload/ImageUpload.jsx';

function Upload({...props}){
//  const { } = props;
  return (
    <div>
      <ImageUpload />
      <ImageUpload avatar/>
    </div>
  );
}

export default Upload;
`;

function Upload({ ...props }) {
  //  const { } = props;
  return (
    <div>
      <h1>Upload</h1>
      <p>
        We've created two special components to make it easier for you to create
        a picture/image upload on your form.
      </p>
      <h2>Styles</h2>
      <p>
        You will find the styles for these components in
        <br />{" "}
        <code>src/assets/scss/material-kit-pro-react/_fileupload.scss</code>.
      </p>
      <h2>ImageUpload</h2>
      <p>
        This component was made to look like{" "}
        <a
          href="https://www.jasny.net/bootstrap/javascript/#fileinput"
          target="_blank"
          rel="noopener noreferrer"
        >
          jasny's
        </a>{" "}
        image uploads with a preview image after the user selects an image, a
        button for changing the image and one for removing it.
      </p>
      <p>
        If you want to submit the image (to save it on your server after it has
        been uploaded) you have to change the <code>handleSubmit</code> function
        in <code>src/components/CustomUpload/ImageUpload.jsx</code> at line 35.
      </p>
      <ImageUpload />
      <ImageUpload avatar />
      <SyntaxHighlighter language="jsx" style={prism}>
        {codeExampleImage}
      </SyntaxHighlighter>
    </div>
  );
}

export default Upload;

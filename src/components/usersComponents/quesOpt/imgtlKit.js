import { IKContext, IKUpload } from 'imagekitio-react';
import { useState } from 'react';

function imgtlkit(){
    const [imageUrl, setImageUrl] = useState(" ");


  const onError = err => {
    console.log("Error", err);
  };

  const onSuccess = res => {
    console.log("Success", res);
    let newImageUrl = res.url;
    console.log(newImageUrl);
    setImageUrl(newImageUrl);
  };

  return (
    <div className="App">

      <IKContext
        publicKey="public_4ErrBHn0GIqK+C5u6R869pWZJVg="
        urlEndpoint="https://ik.imagekit.io/ajyscsf1bof"
        transformationPosition="path"
        authenticationEndpoint="http://localhost:3030/addImage">  {/* this chould be changed from local */}

        {/* // Image upload */}
        <IKUpload fileName="my-upload"
          onError={onError}
          onSuccess={onSuccess}
        />
      </IKContext>
    </div>
  );
}

export default imgtlkit
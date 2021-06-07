import React, { Component } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useState } from 'react';
import {Form} from "react-bootstrap"
function QuestionsForm() {
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
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
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
        </Form>

    )
}

export default QuestionsForm;
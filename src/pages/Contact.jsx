import React, { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";

import Fox from "../models/Fox";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import useAlert from "../hooks/useAlert";

function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoding, setIsLoding] = useState(false);
  const [currentAnimation, setcurrentAnimation] = useState("idle");

  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoding(true);
    setcurrentAnimation("hit");

    console.log(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID);
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Ashu",
          from_email: form.email,
          to_email: "ashutoshg2001@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoding(false);
        showAlert({
          show: true,
          text: "Message sent successfully!",
          type: "success",
        });
        setTimeout(() => {
          hideAlert();
          setcurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
        }, [3000]);

        // TODO: Show success message
        // TODO: Hode an alert
      })
      .catch((error) => {
        setIsLoding(false);
        setcurrentAnimation("idle");
        console.log(error);
        showAlert({
          show: true,
          text: "I didnt receive your message",
          type: "danger",
        });
        // TODO: Show success message
      });
  };

  const handleFocus = () => setcurrentAnimation("walk");
  const handleBlur = () => setcurrentAnimation("idle");

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}
      

      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Ashu"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            ></input>
          </label>

          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="24x7ash@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            ></input>
          </label>

          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              rows={4}
              className="textarea"
              placeholder="Let me know how I can help you!"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            ></textarea>
          </label>

          <button
            type="submit"
            className="btn"
            disabled={isLoding}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoding ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight
            intensity={2.5}
            position={[0, 0, 1]}
          ></directionalLight>
          <ambientLight intensity={0.5}></ambientLight>
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

export default Contact;

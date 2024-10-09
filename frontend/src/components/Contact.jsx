
import { useState } from "react";
import axios from 'axios';


function ContactMe() {


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject:'',
    message: '',
  });



  const [status, setStatus] = useState('');

  //getting value from user input from contact form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      // Send a POST request to the backend

      const response = await axios.post('http://localhost:5000/send-email', formData);
      // const response = await axios.post('/send-email', formData);

      if (response.status === 200) {
        setStatus("Your Message delivered successfully 🥳");
      } else {
        setStatus('Failed to send the message');
      }
    } catch (error) {
      setStatus('An error occurred');
      console.error('Error:', error);
    }
  };


  

    return (
      <div className="h-[80vh] md:h-screen bg-[#dcffd2]">
        <div className="pt-10 md:pt-20">
          <div className="p-4 md:p-8">
            <h1 className=" text-center pb-8 font-light text-2xl md:text-3xl lg:text-5xl">Contact Me</h1>
            <form onSubmit={handleSubmit} className="flex flex-col py-5 px-8 md:px-0 md:py-0 items-center">
              <div className="md:w-3/4 lg:w-2/3 xl:w-1/2">
                <div className="flex flex-col md:flex-row">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="my-2 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full md:w-1/2 md:mr-2 outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="my-2 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full md:w-1/2 md:ml-2 outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="my-2 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
                <textarea

                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Say Something"
                  value={formData.message}
                  onChange={handleChange}
                  className="my-2 py-2 px-4 rounded-md bg-gray-900 text-gray-300 w-full outline-none focus:ring-2 focus:ring-green-600"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="border-2 text-md mt-5 rounded-md py-2 px-4 bg-gray-900 hover:bg-green-600 text-gray-100 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-900"
              >
                Send Message
              </button>
            </form>
            <p className=" md:mt-14 md:text-xl font-semibold text-center py-2 px-4">{status}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default ContactMe;
  
'use client';
import { Console } from "console";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import CustomButton from "../forms/CustomButton";
import Modal from "./Modal" 
import useLoginModal from "@/app/hooks/useLoginModal";
import { handleLogin } from "@/app/lib/action";
import apiService from "@/app/services/apiService";
import { json } from "stream/consumers";

const LoginModal = () => {
    const router = useRouter()
    const LoginModal = useLoginModal()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors,setErrors] = useState<string[]>([])

    const submitLogin = async() => {
        const formData = {
            email:email,
            password:password
        }

        const response = await apiService.postWithoutToken('/api/auth/login/', JSON.stringify(formData))
        
        if (response.access){
            
            handleLogin(response.user.pk,response.access, response.refresh);

            LoginModal.close();
            router.push('/')
        }else{
            setErrors(response.non_field_errors);
        }
    }

    const content = (
        <>
            <form 
                action={submitLogin}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your Email ID" className="w-full px-4 h-[54px] border border-gray-300 rounded-xl" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" className="w-full px-4 h-[54px] border border-gray-300 rounded-xl" />

                {errors.map((error, index)=>{
                    return(
                        <div 
                            key={`error_${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    )
                })}

                

                <CustomButton
                    label="Submit"
                    onClick={submitLogin}
                    className=""
                />
            </form>
        </>
    )
    return(
        <Modal
            isOpen={LoginModal.isOpen}
            close={LoginModal.close}
            label="Login"
            content={content}
        />
    )
}
export default LoginModal;
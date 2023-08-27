import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


function EmailVerify (){
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
    const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:4000/emailverification/${param.number}/verify/${param.token}`;
				const { data } = await axiosPrivate.get(url,{
                    withCredentials:true
                });
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param,axiosPrivate]);

	return(
		<div class="min-h-screen item-center justify-center flex bg-bgimage2 bg-cover">
			{validUrl ? (
				<div className="my-auto ">
                    <div class="  box-border border-2 p-10 border-stone-400 w-auto shadow-xl ">
                        <div class="flex gap-2">
					<span class=" text-slate-900    font-semibold">Email verified successfully</span>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" 
                    class="bi bi-check-square w-10 h-10" 
                    viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                        </svg>
                       </div>
                      <div class="mx-auto">
					<Link to="/emailverification">
						<button className="mx-20 mt-8 border-2 p-2 bg-stone-300 box-border rounded-full hover:bg-stone-400 hover:text-stone-200  border-stone-400 transform active:scale-75 transition-transform">Continue to Website</button>
					</Link>
                </div>
				</div>
                </div>
			) : (
				<h1>404 Not Found . Try again</h1>
			)}
		</div>
	);
};

export default EmailVerify;
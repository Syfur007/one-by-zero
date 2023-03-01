import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import AuthProvider from "./contexts/AuthProvider/AuthProvider.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MessengerCustomerChat from "react-messenger-customer-chat";
import CourseProvider from "./contexts/CourseProvider/CourseProvider.js";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<CourseProvider>
					<div className="">
						<div className="mx-auto max-w-screen-2xl bg-primary">
							<App />
							<MessengerCustomerChat
								pageId="116328604722401"
								appId="638587318272202"
							/>
						</div>
					</div>
				</CourseProvider>
			</AuthProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

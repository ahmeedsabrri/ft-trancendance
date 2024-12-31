import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		sm: '430px',
  		md: '768px',
  		xl: '1280px'
  	},
  	extend: {
  		backgroundImage: {
  			'chat': "url('./chat/Assets/chat_background.png')",
  			'dashboard': "url('./dashboard/Assets/background.jpeg')",
			'setting': "url('./dashboard/setting/assets/settingBg.png')",
  			'authbg': "url('./auth/assets/authBg.svg')",
			'background' :"url('/images/background.jpeg')",
			'background-auth' :"url('/images/background.svg')",
			'logout' :"url('/images/logout-ico.svg')",
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			transparent: 'transparent',
  			current: 'currentColor',
  			white: '#ffffff',
  			purple: '#3f3cbb',
  			midnight: '#121063',
  			metal: '#565584',
  			tahiti: '#3ab7bf',
  			silver: '#ecebff',
  			'bubble-gum': '#ff77e9',
  			bermuda: '#78dcca',
  			yellow: '#ffcf44',
  			orange: '#ff8a44',
  			red: '#ff3d71',
  			green: '#5fcf80',
  			blue: '#3f3cbb',
  			gray: '#565584',
  			light: '#ecebff',
  			blur: 'rgba(63, 63, 63, 0.15)',
  			'blur-dark': 'rgba(128, 128, 128, 0.3)',
  			dark: 'rgba(128, 128, 128, 0.8)',
  			dark_scroll: 'rgba(128, 128, 128, 0.5)',
  			search_blur: 'rgba(0, 0, 0, 0.3)',
  			search_color: 'rgba(255, 255, 255, 0.5)',
  			hover_color: 'rgba(255, 255, 255, 0.1)',
  			active_color: 'rgba(255, 255, 255, 0.2)',
  			border: 'rgba(255, 255, 255, 0.4)',
  			text_message: 'rgba(255, 255, 255, 0.75)',
  			icon_color: 'rgba(217, 217, 217, 0.5)',
  			text_message_color: 'rgba(255, 255, 255, 0.8)',
  			receiver_message_background: 'rgba(255, 255, 255, 0.3)',
  			sender_message_background: 'rgba(255, 255, 255, 0.3)',
  			picton_blue: 'rgba(50, 169, 214, 1)',
  			border_button: 'rgba(217, 217, 217, 0.5)'
  		},
  		boxShadow: {
  			search_inner: 'inset 0px 2px 6px rgba(0, 0, 0, 0.5)',
  			input_inner: 'inset 0px 2px 15px rgba(0, 0, 0, 0.5)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
      require("tailwindcss-animate"),
	  require("tailwind-scrollbar")
],
} satisfies Config;
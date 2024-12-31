


export default function Oauthbutton() {
    const handleOAuthClick = () => {
      const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-e0b27076535bda63355c2ba257e25f2b10ea28d9172f2c153dc56448c7e928a2&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&response_type=code`;
        window.location.href = authUrl;
    };
  
    return (
      <div className="w-[200px] h-[50px] bg-transparent rounded-full flex justify-center items-center">
        <button 
          onClick={handleOAuthClick}
          className='transition ease-in-out delay-150 text-white font-bold font-serif bg-transparent backdrop-blur-lg rounded-full p-2 my-2 w-[250px] h-[50px] hover:bg-black'
        >
          42 Intra
        </button>
      </div>
    );
  }
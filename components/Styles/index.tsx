const Styles = () => {
  return (
    <style jsx global>{`
      body {
        margin: 0;
        color: #fff;
        background: #000;
      }
      .flex-clm {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      .flex-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      /* width */
      ::-webkit-scrollbar {
        width: 5px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #222;
        border-radius: 10px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 10px;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #b30000;
      }
      .container {
        max-width: 1140px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }
      .prevent-select {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
      }
      .main-overlay{
        position:fixed;
        width:100%;
        height:100%;
        top:0;
        right:0;
        left:0;
        background:linear-gradient(105deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
      }
      @media (min-width: 1200px) {
        .container {
          width: 100%;
        }
      }
    `}</style>
  );
};

export default Styles;

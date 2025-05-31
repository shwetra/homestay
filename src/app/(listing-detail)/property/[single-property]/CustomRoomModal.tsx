interface CustomRoomModalProps {
	isOpen: boolean;
	closeModal: () => void;
	title: string;
	children: any;
}

const CustomRoomModal: React.FC<CustomRoomModalProps> = ({ isOpen, closeModal, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed z-40 inset-0 bg-black bg-opacity-80 flex items-center justify-center h-screen top-[-16px]">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative overflow-y-scroll max-h-[90vh] hide-scrollbar">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="text-gray-700 mb-4">{children}</div>
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
          >
            &times;
          </button>
          <button
            onClick={closeModal}
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded transition duration-200 ease-in-out mt-3"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  

  export default CustomRoomModal
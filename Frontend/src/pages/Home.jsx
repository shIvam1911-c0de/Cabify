import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";
import { SocketContext } from "../Context/SocketContext";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../Components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null); // this is used to give the name any input or div
  const panelCloseRef = useRef(null); // this is used to give the name any input or div
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);
  const lookingForDriverPanelRef = useRef(null);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const waitingForDriverPanelRef = useRef(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    console.log("user detail",user);
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on('ride-confirmed', ride => {

    setLookingForDriverPanel(false)  
    setWaitingForDriverPanel(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    console.log("ride started", ride);
    setWaitingForDriverPanel(false);
    navigate("/riding", { state: { ride } }); // changed code
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, { height: "70%", padding: 24 });
        gsap.to(panelCloseRef.current, { opacity: 1 });
      } else {
        gsap.to(panelRef.current, { height: "0%", padding: 0 });
        gsap.to(panelCloseRef.current, { opacity: 0 });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      y: confirmRidePanel ? 0 : "100%",
    });
  }, [confirmRidePanel]); // Dependency array removed because useGSAP doesn’t use it

  useGSAP(() => {
    gsap.to(lookingForDriverPanelRef.current, {
      y: lookingForDriverPanel ? 0 : "100%",
    });
  }, [lookingForDriverPanel]);

  
  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPanel]
  );

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // console.log(response.data);
    setFare(response.data);
  }

  async function createRide(){
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("response data", response.data);
    setVehiclePanel(false);
    setConfirmRidePanel(true);
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="w-20 top-8 left-5 absolute "
        src="https://tse3.mm.bing.net/th?id=OIP.9UnwWZb1MMVd0efmk4vVowHaCL&pid=Api&P=0&h=180"
      />

      <div className="h-screen w-screen">
        <LiveTracking/>
      </div>

      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full  ">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form
            className="relative py-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-2/5 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-gray-300 px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Enter Pickup"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-gray-300 px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter Destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white font-medium rounded-full p-1 py-2  w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white  ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 pt-12  py-6"
      >
        <VehiclePanel
          selectVehicle = {setVehicleType} 
          fare = {fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 pt-12 py-6"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setLookingForDriverPanel={setLookingForDriverPanel}
        />
      </div>
      <div
        ref={lookingForDriverPanelRef}
        className="fixed w-full z-10 bottom-0 bg-white translate-y-full px-3  py-6 pt-12"
      >
        <LookingForDriver 
        createRide={createRide}
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType} 
        setLookingForDriverPanel={setLookingForDriverPanel} />
      </div>

      <div
        ref={waitingForDriverPanelRef}
        className="fixed w-full z-10 bottom-0 bg-white  px-3  py-6 pt-12"
      >
        <WaitingForDriver
          ride={ride}
          setLookingForDriverPanel={setLookingForDriverPanel}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
          waitingForDriverPanel={waitingForDriverPanel}
        />
      </div>
    </div>
  );
};

export default Home;

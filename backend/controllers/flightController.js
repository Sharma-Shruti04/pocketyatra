import { getJson } from "serpapi";
import dotenv from "dotenv";
dotenv.config();

export const searchFlights=async(req,res)=>{
    try {
        const {from,to,depart,returnDate}=req.body;
        if(!from || !to || !depart){
            return res.status(400).json({message:"All fields are required"});
        }
        const API_KEY = process.env.SERP_API_KEY;
        if(!API_KEY){
            const dummyFlights=[
                {
                   id:1,
                   airline:"Indigo",
                   flight_number:"AI123",
                   departure_time:"2025-10-29T10:00:00",
                   arrival_time:"2025-10-29T12:00:00",
                   price_in_inr:5000,
                   price_in_usd:75,
                   details:`Non-stop flight from ${from} to ${to} (${depart})`,
                   is_round_trip:!!returnDate,
                   seats_available:Math.floor(Math.random()*30)+1,
                   cabin_class:"Economy"

                },
                {
                    id:2,
                    airline:"Air India",
                    flight_number:"AI123",
                    departure_time:"2025-10-29T10:00:00",
                    arrival_time:"2025-10-29T12:00:00",
                    price_in_inr:5000,
                    price_in_usd:75,
                    details:`Non-stop flight from ${from} to ${to} (${depart})`,
                    is_round_trip:!!returnDate,
                    seats_available:Math.floor(Math.random()*30)+1,
                    cabin_class:"Economy"

                },
                {
                    id:3,
                    airline:"Indigo",
                    flight_number:"AI123",
                    departure_time:"2025-10-29T10:00:00",
                    arrival_time:"2025-10-29T12:00:00",
                    price_in_inr:5000,
                    price_in_usd:75,
                    details:`Non-stop flight from ${from} to ${to} (${depart})`,
                    is_round_trip:!!returnDate,
                    seats_available:Math.floor(Math.random()*30)+1,
                    cabin_class:"Economy"

                }

            ];
            console.log("Using dummy flight data. Set SERP_API_KEY in .env to use real flight data");
            return res.json({success:true,data:dummyFlights});
        }
        const params={
            engine:"google_flights",
            departure_id:from.toUpperCase(),
            arrival_id:to.toUpperCase(),
            outbound_date:depart,
            type: returnDate ? "2" : "1",
            currency:"USD",
            hl:"en",
        };
        if(returnDate){
            params.return_date=returnDate;
        }
        console.log("Calling SerpAPI with params:",{ ...params });
        console.log("API Key present:", !!API_KEY);
        const startTime = Date.now();
        
        const json=await new Promise((resolve,reject) => { 
            let isResolved = false;
            const timeout=setTimeout(()=>{
                if(!isResolved){
                    isResolved = true;
                    console.error(`SerpAPI request timed out after ${(Date.now()-startTime)/1000}s`);
                    reject(new Error("Request to SerpAPI timed out after 90 seconds"));
                }
            },90000);
            
            try {
                getJson({api_key:API_KEY, ...params },(data)=>{
                    if(isResolved) return;
                    isResolved = true;
                    clearTimeout(timeout);
                    
                    const elapsed = ((Date.now()-startTime)/1000).toFixed(2);
                    console.log(`SerpAPI responded in ${elapsed}s`);
                    
                    if(!data){
                        console.error("SerpAPI returned null/undefined data");
                        return reject(new Error("No data received from SerpAPI"));
                    }
                    if(data.error){
                        console.error("Error from SerpAPI:",JSON.stringify(data,null,2));
                        if(data.error.includes("Invalid API key")){
                            return reject(new Error("Invalid API key"));
                        }
                        return reject(new Error(data.error || "Unknown error from SerpAPI"));
                    }
                    const bestCount = data.best_flights?.length || 0;
                    const otherCount = data.other_flights?.length || 0;
                    console.log(`SerpAPI response received. best_flights=${bestCount}, other_flights=${otherCount}, total=${bestCount+otherCount}`);
                    resolve(data);
                });
            } catch(err) {
                if(!isResolved){
                    isResolved = true;
                    clearTimeout(timeout);
                    console.error("Exception calling SerpAPI:", err);
                    reject(err);
                }
            }
        });
        const bestFlights=json.best_flights || [];
        const otherFlights=json.other_flights||[];
        const formatFlights=(flights)=>{
            let idCounter=1;
            const formattedList=[];
            for(const flightGroup of flights){
                const flightSegments=flightGroup.flights||[flightGroup];
                const firstSegment=flightSegments[0];
                const lastSegment=flightSegments[flightSegments.length-1];
                const totalDuration = (typeof flightGroup.duration === 'number' && flightGroup.duration >= 0)
                    ? flightGroup.duration
                    : flightSegments.reduce((sum, seg)=> sum + (seg?.duration || 0), 0);
                const price=flightGroup.price;
                const formatTime=(timeString)=>{
                    if(!timeString) return 'N/A';
                    try{
                        const date=new Date(timeString);
                        const hours=date.getHours();
                        const minutes=date.getMinutes();
                        const ampm=hours>=12?'PM':'AM';
                        const displayHours=hours%12||12;
                        const displayMinutes=minutes.toString().padStart(2,'0');
                        return `${displayHours}:${displayMinutes} ${ampm}`;
                    }
                    catch(e){
                        const match=timeString.match(/(\d{2}):(\d{2})/);
                        return match ? `${match[1]}:${match[2]}` : timeString.substring(11,16)||'N/A';
                    }
                };
                
                const layovers=flightGroup.layovers||[];
                const layoverInfo=layovers.length>0?layovers.map(l=>`${l.name} (${Math.floor(l.duration/60)}h ${l.duration%60}m layover)`).join(','):null;
                
                formattedList.push({
                    id:idCounter++,
                    airline:flightSegments.map(s=>s.airline||s.airline?.[0]?.name || 'Unknown').join('/'),
                    flight_number:flightSegments.map(s=>s.flight_number||'').filter(f=>f).join('/'),
                    departure_time: formatTime(firstSegment.departure_time?.time||firstSegment.departure_time),
                    arrival_time: formatTime(lastSegment.arrival_time?.time||lastSegment.arrival_time),
                    departure_airport:firstSegment.departure_airport?.name||firstSegment.departure_airport?.id||from,
                    arrival_airport:lastSegment.arrival_airport?.name||lastSegment.arrival_airport?.id||to,
                    duration: totalDuration ?`${Math.floor(totalDuration/60)}h ${totalDuration%60}m`:'N/A',
                    price_in_inr: price ? Math.round(price * 83) : 5000 + Math.floor(Math.random() * 3000),
                    price_in_usd: price || 60 + Math.floor(Math.random() * 40),
                    details:flightSegments.length>1
                            ? `${flightSegments.length-1} stop${flightSegments.length>2 ? 's':''}${layoverInfo ? ' - '+layoverInfo:''}`
                            :'Non-stop',
                    stops: flightSegments.length-1,
                    layovers:layoverInfo,
                    carbon_emissions: flightGroup.carbon_emissions?.this_flight ? `${(flightGroup.carbon_emissions.this_flight / 1000).toFixed(0)} kg`:null,
                    booking_token:flightGroup.booking_token||null,
                    is_round_trip: !!returnDate,
                    seats_available: Math.floor(Math.random() * 30) + 1,
                    cabin_class: "Economy"
                });
            }
            return formattedList;
        };
        const allFlights=[ ...formatFlights(bestFlights), ...formatFlights(otherFlights)];
        if(allFlights.length === 0){
            console.warn("No flights formatted from SERPAPI response");
            console.log("Response structure:",JSON.stringify(json,null,2).substring(0,500)+"...");
        
        }
        else{
            console.log(`Successfully formatted ${allFlights.length} flights`);

        }
        res.json({success:true, data:allFlights});
    } catch (err) {
        console.error("Error fetching flights from SERPAPI");
        console.error("Error message",err.message);
        let errorMessage="Failed to fetch flight data.Check backend console for details";
        if(err.message.includes("timeout")){
            errorMessage="Search timed out. Please try shorter dates or refresh";

        }
        else if(err.message.includes("Invalid API key")||err.message.includes("api_key")){
            errorMessage="API key invalid or exceeded usage limit. Please check SERP_API_KEY";


        }
        else if(err.message.includes("No response")||err.message.includes("Unknown SERPAPI error")){
            errorMessage="SerpAPI failed to return data. Check airport codes (IATA) and dates";

        }
        else if(err.message){
            errorMessage=err.message;
        }
        console.error("--Error Details to Troubleshoot--");
        console.error(err);
        console.error("---------------------------------");
        res.status(500).json({
            message:errorMessage,
            error:err.message
        })
    }
};
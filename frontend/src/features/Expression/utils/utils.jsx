import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";


//setting up the initial mediapipe
export const init = async ({ landmarkerRef, videoRef, streamRef }) => {

    streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true
    });

    if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
    }
    
    await new Promise((resolve) => {
        if (!videoRef.current) return;

        videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            resolve();
        };
    });

    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    const landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
        numFaces: 1
    });

    landmarkerRef.current = landmarker;
};
//detecting facial expreesion
export const detect = ({ landmarkerRef, videoRef, setExpression }) => {

    if (!videoRef.current || !landmarkerRef.current) {
        return;
    }

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        Date.now()
    );

    if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {

        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) => {
            const item = blendshapes.find((b) => b.categoryName === name);
            return item ? item.score : 0;
        };

        const smile = Math.max(
            getScore("mouthSmileLeft"),
            getScore("mouthSmileRight")
        );

        const blink = Math.max(
            getScore("eyeBlinkLeft"),
            getScore("eyeBlinkRight")
        );

        const jawOpen = getScore("jawOpen");

        const eyeWide = Math.max(
            getScore("eyeWideLeft"),
            getScore("eyeWideRight")
        );

        const browDown = Math.max(
            getScore("browDownLeft"),
            getScore("browDownRight")
        );

        let mood = "Neutral";   // ⭐ ADD THIS

        if (smile > 0.55) {
            setExpression("😊 Smiling");
            mood = "Smiling";
        }
        else if (jawOpen > 0.45 && eyeWide > 0.35) {
            setExpression("😲 Surprised");
            mood = "Surprised";
        }
        else if (blink > 0.7) {
            setExpression("😉 Blinking");
            mood = "Neutral";
        }
        else if (browDown > 0.45) {
            setExpression("😠 Angry");
            mood = "Angry";
        }
        else {
            setExpression("😐 Neutral");
            mood = "Neutral";
        }

        return mood;   // ⭐ ADD THIS
    }

};
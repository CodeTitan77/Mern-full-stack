import RenderSteps from "./RenderSteps";

export default function AddCourse(){
    return(
        <div className="text-white">
            <div>
                <h1>Add Course</h1>
                <div>
                 <RenderSteps/>
                </div>
            </div>
            <div>
                <p>
                    Code Upload Tips
                </p>
                <ul>
                    <li>
                        Set the Course Price option or make it free
                    </li>
                    <li>
                        Set the Course Price option or make it free
                    </li>
                    <li>
                        Set the Course Price option or make it free
                    </li>
                </ul>
            </div>
        </div>
    )
}
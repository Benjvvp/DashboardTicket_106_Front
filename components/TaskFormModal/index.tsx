import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext/UserContext";
import { getItem } from "../../helpers/localStorage";
import { createTask } from "../../helpers/serverRequests/tasks";
import { DropDownInput, InputDefault, TextAreaInput } from "../Inputs";

interface propsTaskFormModal {
  modalFormTask: boolean;
  setModalFormTask: (value: boolean) => void;
  setIsModalActive: (value: boolean) => void;
}
export default function TaskFormModal(props: propsTaskFormModal) {
  const { userData } = useContext(UserContext);
  const { modalFormTask, setModalFormTask, setIsModalActive } = props;

  const [projectNameError, setProjectNameError] = useState("");
  const [projectDescriptionError, setprojectDescriptionError] = useState("");
  const [intentToCreateTask, setIntentToCreateTask] = useState(false);
  const [sucessCreateTask, setSucessCreateTask] = useState(false);
  const [createTaskValues, setCreateTaskValues] = useState({
    author: "",
    title: "",
    description: "",
    category: "Other",
    priority: "Low",
  });

  const handleClick = async (e: any) => {
    setIntentToCreateTask(true);
    e.preventDefault();
    if(
      createTaskValues.title.length < 5 ||
      createTaskValues.description.length < 5
    ) return;
    
    if (projectNameError === "" && projectDescriptionError === "") {
      try {
        let token = await JSON.parse(await getItem("token"));
        const response = await createTask(token, createTaskValues);

        if (response.status === 200) {
          setSucessCreateTask(true);
          setIntentToCreateTask(false);
          setCreateTaskValues({
            author: "",
            title: "",
            description: "",
            category: "Other",
            priority: "Low",
          });
          setTimeout(() => {
            setSucessCreateTask(false);
          }, 2000);
        }
        if (response.status === 400) {
          if(response.data.message === "Task already exists."){
            setProjectNameError("Task already exists.");
          };
          
          if (
            response.data.message ===
            "Missing required fields in the request body."
          ) {
            if (createTaskValues.title === "") {
              setProjectNameError("Project name is required");
            }
            if (createTaskValues.description === "") {
              setprojectDescriptionError("Project description is required");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    createTaskValues.author = userData._id;
    if (!intentToCreateTask) return;
    if (createTaskValues.title.length <= 4) {
      setProjectNameError("Project name must be at least 5 characters");
    } else {
      setProjectNameError("");
    }
    if (createTaskValues.description.length <= 4) {
      setprojectDescriptionError(
        "Project description must be at least 5 characters"
      );
    } else {
      setprojectDescriptionError("");
    }
  }, [createTaskValues, intentToCreateTask]);

  return (
    <div
      id="modalFormTask"
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-[60] w-full md:inset-0 h-modal md:h-full  flex items-center justify-center ${
        modalFormTask ? "block" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full min-h-[70vh] md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-[#1F2128] border border-[#E8EDF2] dark:border-[#313442] min-h-[70vh]">
          <div className="flex justify-between items-start p-5 rounded-t dark:border-gray-600">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setModalFormTask(false);
                setIsModalActive(false);
                setIntentToCreateTask(false);
                setProjectNameError("");
                setprojectDescriptionError("");
                setCreateTaskValues({
                  author: "",
                  title: "",
                  description: "",
                  category: "Other",
                  priority: "Low",
                });
                setSucessCreateTask(false);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <h1 className="font-semibold text-[20px] text-[#07070C] text-center dark:text-white">
            Create a New Project
          </h1>
          <div
            className={`p-5 w-11/12 mx-auto rounded-xl mt-5 text-white bg-green-600 dark:bg-green-700 text-center ${
              sucessCreateTask ? "block" : "hidden"
            }`}
          >
            <p>Sucess task created.</p>
          </div>
          <div className="p-6 space-y-6 mt-2 h-full">
            <div
              className={`${projectNameError.length === 0 ? "" : "mb-[4em]"}`}
            >
              <label
                htmlFor="projectName"
                className="block text-md text-[#07070C] dark:text-white font-medium"
              >
                Project Name
              </label>
              <InputDefault
                name="Project Name"
                type="text"
                placeholder="Type name here"
                onChange={(e) =>
                  setCreateTaskValues({
                    ...createTaskValues,
                    title: e.target.value,
                  })
                }
                error={projectNameError}
                classNameInput="dark:placeholder-[#64646F]"
                value={createTaskValues.title}
              />
            </div>
            <div className="h-full">
              <label
                htmlFor="projectDescription"
                className="block text-md text-[#07070C] dark:text-white font-medium"
              >
                Description
              </label>
              <TextAreaInput
                name="Description"
                placeholder="Type description here"
                onChange={(e) =>
                  setCreateTaskValues({
                    ...createTaskValues,
                    description: e.target.value,
                  })
                }
                error={projectDescriptionError}
                classNameInput="dark:placeholder-[#64646F]"
                rows={10}
                cols={5}
                value={createTaskValues.description}
              />
            </div>
            <div className="h-full">
              <label
                htmlFor="projectDescription"
                className="block text-md text-[#07070C] dark:text-white font-medium"
              >
                Category
              </label>
              <DropDownInput
                name="Category"
                text={createTaskValues.category}
                onClick={(e) =>
                  setCreateTaskValues({
                    ...createTaskValues,
                    category: e.currentTarget.innerHTML,
                  })
                }
                classNameInput="dark:placeholder-[#64646F] text-[14px] text-[#9A9AAF] dark:text-[#64646F]"
                list={["Software Team", "Design Team", "Testing Team", "Other"]}
                iconPath="/svg/arrow-down.svg"
              />
            </div>
            <div className="h-full">
              <label
                htmlFor="projectDescription"
                className="block text-md text-[#07070C] dark:text-white font-medium"
              >
                Priority
              </label>
              <DropDownInput
                name="Priority"
                text={createTaskValues.priority}
                onClick={(e) =>
                  setCreateTaskValues({
                    ...createTaskValues,
                    priority: e.currentTarget.innerHTML,
                  })
                }
                classNameInput="dark:placeholder-[#64646F] text-[14px] text-[#9A9AAF] dark:text-[#64646F]"
                list={["High", "Medium", "Low"]}
                iconPath="/svg/arrow-down.svg"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="flex justify-center py-2 w-full border border-transparent font-[16px] font-medium rounded-md text-white bg-[#7364DB] hover:outline hover:outline-[1px] hover:outline-[#B2A7FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-500 ease-in-out"
                onClick={(e) => handleClick(e)}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

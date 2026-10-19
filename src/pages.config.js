import AIAssistant from './pages/AIAssistant';
import Analytics from './pages/Analytics';
import Assignments from './pages/Assignments';
import Calculator from './pages/Calculator';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Exams from './pages/Exams';
import Files from './pages/Files';
import Flashcards from './pages/Flashcards';
import FocusTimer from './pages/FocusTimer';
import GradeTracker from './pages/GradeTracker';
import MathSolver from './pages/MathSolver';
import MyDay from './pages/MyDay';
import Notes from './pages/Notes';
import PracticeTests from './pages/PracticeTests';
import Settings from './pages/Settings';
import StudyGroups from './pages/StudyGroups';
import Tasks from './pages/Tasks';
import Timetable from './pages/Timetable';
import Whiteboard from './pages/Whiteboard';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AIAssistant": AIAssistant,
    "Analytics": Analytics,
    "Assignments": Assignments,
    "Calculator": Calculator,
    "Calendar": Calendar,
    "Dashboard": Dashboard,
    "Events": Events,
    "Exams": Exams,
    "Files": Files,
    "Flashcards": Flashcards,
    "FocusTimer": FocusTimer,
    "GradeTracker": GradeTracker,
    "MathSolver": MathSolver,
    "MyDay": MyDay,
    "Notes": Notes,
    "PracticeTests": PracticeTests,
    "Settings": Settings,
    "StudyGroups": StudyGroups,
    "Tasks": Tasks,
    "Timetable": Timetable,
    "Whiteboard": Whiteboard,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};
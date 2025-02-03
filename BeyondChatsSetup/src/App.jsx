import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Registration from './components/Registration';
import EmailVerification from './components/EmailVerification';
import SetupOrganization from './components/SetupOrganization';
import ChatbotIntegration from './components/ChatBotIntegration';
import SuccessScreen from './components/SuccessScreen';
import ScrapedData from './components/WebScrapingStatus';
SuccessScreen
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registration/>} />
          <Route path='/verify' element={<EmailVerification/>} />
          <Route path='/setup' element={<SetupOrganization/>} />
          <Route path='/scraped-data' element={<ScrapedData/>} />
          <Route path='/integration' element={<ChatbotIntegration/>} />
          <Route path='/success' element={<SuccessScreen/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
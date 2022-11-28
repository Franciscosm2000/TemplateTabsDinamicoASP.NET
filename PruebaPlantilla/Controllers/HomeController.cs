using System.Web.Mvc;

namespace PruebaPlantilla.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AnotherLink()
        {
            return View("Index");
        }

        public ActionResult FirstTab()
        {
            return PartialView("_FirstTab");
        }

        public ActionResult SecondTab()
        {
            //return PartialView("_SecondTab");
            return PartialView("_Segundo");
        }
    }
}

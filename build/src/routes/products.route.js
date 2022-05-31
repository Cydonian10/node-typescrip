"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validatorHandler_1 = require("../middlewares/validatorHandler");
const product_schema_1 = require("../schemas/product.schema");
const product_service_1 = require("../services/product.service");
const router = express_1.default.Router();
const service = new product_service_1.ProductService();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield service.findMany();
    res.status(200).json({
        message: "All products",
        data: products,
    });
}));
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = service.findOne(id);
    if (!product) {
        res.status(404).json({
            message: "not found",
        });
    }
    res.status(200).json({
        message: "One product",
        data: product,
    });
});
router.post("/", (0, validatorHandler_1.validatorHandler)(product_schema_1.CreateProductSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const newProduct = yield service.create(data);
    res.status(200).json({
        message: "Created Product",
        data: newProduct,
    });
}));
/* router.patch(
  "/:id",
  validatorHandler(updateProductSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const product = service.update(id, body);
      res.status(200).json({
        message: "Updated Product",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  const idServi = service.delete(id);
  res.status(200).json({
    message: "Updated Product",
    data: idServi,
  });
}); */
exports.default = router;
//# sourceMappingURL=products.route.js.map
import java.util.LinkedHashMap;
import java.util.Map;

class Product {
    String name;
    boolean inStock;
    String category;

    Product(String name, boolean inStock, String category) {
        this.name = name;
        this.inStock = inStock;
        this.category = category;
    }
}

public class BrowsingAndCategorization {
    private Map<String, Product> productCatalog;

    public BrowsingAndCategorization() {
        productCatalog = new LinkedHashMap<>(); // preserves insertion order
        productCatalog.put("Keyboard", new Product("Keyboard", true, "Technology"));
        productCatalog.put("Mouse", new Product("Mouse", false, "Technology"));
        productCatalog.put("Shoes", new Product("Shoes", true, "Fashion"));
    }

    public String clickProduct(String productName) {
        Product product = productCatalog.get(productName);
        if (product == null) return "Product not found";
        if (!product.inStock)
            return product.name + " - Sorry this item is out of stock.";
        return product.name + " - Product Information Displayed";
    }

    public String clickCategory(String category) {
        StringBuilder sb = new StringBuilder("Products in " + category + ": ");
        for (Product product : productCatalog.values()) {
            if (product.category.equals(category)) {
                sb.append(product.name).append(" ");
            }
        }
        return sb.toString().trim();
    }

    public String enterWebsite() {
        return "Product browsing page displayed";
    }
}

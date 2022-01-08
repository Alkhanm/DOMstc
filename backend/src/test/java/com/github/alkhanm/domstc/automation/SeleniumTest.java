package com.github.alkhanm.domstc.automation;

import com.github.alkhanm.domstc.unit.util.ProductCreator;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class SeleniumTest {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "/home/alkham/Downloads/libs/chromedriver");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));


        try {
            driver.get("http://localhost:8080");
            for (int i = 0; i < 5; i++){
                {
                    Thread.sleep(800);
                    driver.findElement(By.id("product-new-link")).click();

                    Thread.sleep(500);
                    wait.until(d -> d.findElement(By.id("field-name")))
                            .sendKeys(ProductCreator.createName());

                    Thread.sleep(500);
                    int price = ProductCreator.createPrice();
                    wait.until(d -> d.findElement(By.id("field-purchase-price")))
                            .sendKeys(Integer.toString(price));

                    Thread.sleep(500);
                    wait.until(d -> d.findElement(By.id("field-sale-price")))
                            .sendKeys(String.valueOf((price * 1.5)));

                    Thread.sleep(500);
                    wait.until(d -> d.findElement(By.id("field-brand")))
                            .sendKeys(ProductCreator.createBrand());

                    Thread.sleep(500);
                    wait.until(d -> d.findElement(By.id("field-acquisition-date")))
                            .sendKeys(LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy")));

                    Thread.sleep(500);
                }
                {
                    wait.until(e -> e.findElement(By.id("btn-save"))).click();
                    driver.findElement(By.id("product-list-link")).click();
                }
            }
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
           // driver.quit();
        }
    }
}
  
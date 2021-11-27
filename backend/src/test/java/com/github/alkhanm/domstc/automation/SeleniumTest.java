package com.github.alkhanm.domstc.automation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public class SeleniumTest {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "/home/alkham/Downloads/libs/chromedriver");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("http://localhost:8080");
            for (int i = 0; i < 10; i++){
                {
                    Thread.sleep(1000);
                    driver.findElement(By.id("product-new-link")).click();
                    Thread.sleep(600);
                    wait.until(d -> d.findElement(By.id("field-name")))
                            .sendKeys("Produto" + new Random(10).nextInt() * 2);
                    Thread.sleep(600);
                    wait.until(d -> d.findElement(By.id("field-purchase-price")))
                            .sendKeys("19.90");
                    Thread.sleep(600);
                    wait.until(d -> d.findElement(By.id("field-sale-price")))
                            .sendKeys("31.99");
                    Thread.sleep(600);
                    wait.until(d -> d.findElement(By.id("field-brand")))
                            .sendKeys("Marca Genérica");
                    Thread.sleep(600);
                    wait.until(d -> d.findElement(By.id("field-acquisition-date")))
                            .sendKeys(LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy")));
                    Thread.sleep(600);
                }
                {
                    wait.until(e -> e.findElement(By.id("btn-save"))).click();
                    driver.findElement(By.id("product-list-link")).click();
                }
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
  
package com.github.alkhanm.domstc.unit.util.other;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Other {
    public static void main(String[] args) {
        var date = LocalDateTime.parse("2022-01-21T00:04:37.855Z");
        var date2 = DateTimeFormatter.ofPattern("2022-01-21T00:04:37.855Z");
        System.out.println();
        System.out.println(date);
    }
}

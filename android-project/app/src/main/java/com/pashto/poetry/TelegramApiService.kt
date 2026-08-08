package com.pashto.poetry

import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query

interface TelegramApiService {
    @GET("api/telegram/channel")
    fun getPoetryFeed(
        @Query("channel") channel: String,
        @Query("botToken") botToken: String? = null
    ): Call<PoetryResponse>
}

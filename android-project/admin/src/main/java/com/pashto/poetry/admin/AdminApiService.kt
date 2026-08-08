package com.pashto.poetry.admin

import retrofit2.Call
import retrofit2.http.*

interface AdminApiService {

    @GET("api/custom-posts")
    fun getCustomPosts(): Call<AdminPoetryResponse>

    @POST("api/custom-posts")
    fun publishPost(
        @Body request: PublishPostRequest
    ): Call<AdminPublishResponse>

    @DELETE("api/custom-posts/{id}")
    fun deletePost(
        @Path("id") id: String
    ): Call<AdminDeleteResponse>
}

data class PublishPostRequest(
    val authorName: String,
    val text: String,
    val mediaType: String,
    val photoUrl: String?,
    val videoUrl: String?
)

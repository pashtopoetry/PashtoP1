package com.pashto.poetry.admin

import com.google.gson.annotations.SerializedName

data class AdminPoetryResponse(
    @SerializedName("ok") val ok: Boolean,
    @SerializedName("posts") val posts: List<AdminPoetryPost>
)

data class AdminPublishResponse(
    @SerializedName("ok") val ok: Boolean,
    @SerializedName("post") val post: AdminPoetryPost
)

data class AdminDeleteResponse(
    @SerializedName("ok") val ok: Boolean,
    @SerializedName("message") val message: String?
)

data class AdminPoetryPost(
    @SerializedName("id") val id: String,
    @SerializedName("text") val text: String,
    @SerializedName("timestamp") val timestamp: Long,
    @SerializedName("formattedDate") val formattedDate: String,
    @SerializedName("authorName") val authorName: String,
    @SerializedName("viewsCount") val viewsCount: String?,
    @SerializedName("mediaType") val mediaType: String,
    @SerializedName("photoUrl") val photoUrl: String?,
    @SerializedName("videoUrl") val videoUrl: String?
)

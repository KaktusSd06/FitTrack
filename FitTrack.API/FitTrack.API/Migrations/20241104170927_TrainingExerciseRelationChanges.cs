using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FitTrack.API.Migrations
{
    /// <inheritdoc />
    public partial class TrainingExerciseRelationChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExercisesInTraining");

            migrationBuilder.DropTable(
                name: "TrainingsInProgram");

            migrationBuilder.DropTable(
                name: "TrainingPrograms");

            migrationBuilder.AddColumn<int>(
                name: "IndividualTrainingId",
                table: "Exercises",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_IndividualTrainingId",
                table: "Exercises",
                column: "IndividualTrainingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_IndividualTrainings_IndividualTrainingId",
                table: "Exercises",
                column: "IndividualTrainingId",
                principalTable: "IndividualTrainings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_IndividualTrainings_IndividualTrainingId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_IndividualTrainingId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "IndividualTrainingId",
                table: "Exercises");

            migrationBuilder.CreateTable(
                name: "ExercisesInTraining",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExerciseId = table.Column<int>(type: "integer", nullable: false),
                    TrainingId = table.Column<int>(type: "integer", nullable: false),
                    TrainingType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExercisesInTraining", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExercisesInTraining_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingPrograms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TrainerId = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPrograms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingPrograms_AspNetUsers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingsInProgram",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TrainingProgramId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingsInProgram", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingsInProgram_TrainingPrograms_TrainingProgramId",
                        column: x => x.TrainingProgramId,
                        principalTable: "TrainingPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExercisesInTraining_ExerciseId",
                table: "ExercisesInTraining",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPrograms_TrainerId",
                table: "TrainingPrograms",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingsInProgram_TrainingProgramId",
                table: "TrainingsInProgram",
                column: "TrainingProgramId");
        }
    }
}
